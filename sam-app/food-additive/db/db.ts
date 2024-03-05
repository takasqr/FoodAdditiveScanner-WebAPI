import { Connection, Request, ColumnValue } from 'tedious';


exports.config = async () => {
    
   let config = {
       server: process.env.HOST_NAME,
       authentication: {
           type: 'default',
           options: {
               userName: process.env.USER,
               password: process.env.PASSWORD
           }
       },
       options: {
           encrypt: false,
           database: process.env.DB_NAME,
           port: process.env.PORT,
           rowCollectionOnRequestCompletion: true
       }
   };

   return config;
};

exports.createConnection = (config: any) => {
    const Connection = require('tedious').Connection;
    const connection = new Connection(config);

    return new Promise(function(resolve, reject) {

        connection.on('connect', (err: any) => {
            if (err) {
                reject(err);
            } else {
                
                resolve(connection);
            }
        });
                
        connection.connect();
    });
};

type Param = {
    name: string;
    type: any; // ここで具体的な型を指定できる。tediousライブラリの型を使用することも可能
    value: any;
};

const execute = (
    connection: Connection, 
    sql: string, 
    params: Param[]
): Promise<any[]> => { // 戻り値の型を必要に応じて調整する
    return new Promise((resolve, reject) => {
        const request = new Request(sql, (err: Error | null, rowCount: number, columns: ColumnValue[][]) => {
            if (err) {
                reject(err);
                return;
            }

            let rows: any[] = [];
            columns.forEach(column => {
                let row: {[key: string]: any} = {};
                column.forEach(field => {
                    row[field.metadata.colName] = field.value;
                });
                rows.push(row);
            });

            resolve(rows);
        });

        if (params.length > 0) {
            params.forEach(param => {
                request.addParameter(param.name, param.type, param.value);
            });
        }

        connection.execSql(request);
    });
};

exports.execute = execute;