import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const db = require('./db/db.js');
    const method = require('./db/method.ts')

    try {

        let response = {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };

        console.log(event)

        // SQL を取得
        if (event.httpMethod === 'GET') {

            const queryStringParameters: any = event.queryStringParameters

            let sql = '';

            let offset = queryStringParameters?.offset ?? ''
            let fetch = queryStringParameters?.fetch ?? ''

            sql = method.get(offset, fetch)
    
            console.log(sql)
    
            // DBに接続
            const config = await db.config();

            const connection = await db.createConnection(config);

            const result = await db.execute(connection, sql, []);
            
            // DBへの接続を閉じる
            connection.close()
    
            response = {
                statusCode: 200,
                body: JSON.stringify(result)
            };
        } else if (event.httpMethod === 'POST') {

            let body = event.body
            const obj: any = JSON.parse(body ?? '');

            // DBに接続
            const config = await db.config();

            const connection = await db.createConnection(config);

            // 行でループしてINSERTする

            // SQLを取得
            const sql = method.post(obj)

            console.log(sql)

            const TYPES = require('tedious').TYPES;
            const result = await db.execute(connection, sql, []);
    
            console.log('result:', result)

            // DBへの接続を閉じる
            console.log('DBへの接続を閉じる')
            connection.close()

            response = {
                statusCode: 200,
                body: ''
            };
        }

        return response

    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};
