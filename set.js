const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkE1bzVtek1NeERSWjB6YlZUWWJJNEhsS2ZqMGwyaUdQa2JrdGFkbklIND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia25SVXpRZzJlUTJRNlUyV0Z3MDl5NTlmUStRNEMxb0pKUHFzaTRXS2RGYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrQU1IWGJKcU1uQVNLd20rc3BNaUFwS1pHMzc4VHgzb2pxMUtLOEp5UjJRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTZE5URC9jc3pGczh3NG9hTkdyMjBpcFNCbEZ0WU0wL2hqdzlBTHlvREcwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9QV05uYkZaZnNpYmR4TXk1U2xTamVqamVMY0hlZ3E3VGFJaWlJQldvVlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNGT0I3UVhaTW45MFZGRTVtcGtvMmkwMkNtNkczMjF1WHFQU1V4bjh5Qzg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicU5BTXNOYjRrR2YyRHZXcVNzVndtS094U1Z3MUVlM0JYNFhPN2tVc3AwQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOGl0SHF5SEJCU2VzUHNPcXlOMnZ4NHV3MEdaZHNha1N4RXNnOWJtOWZuaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJaTVlIWnN4Rm1SYVJvYXkxZUhpU3laYVU5MDdSQkJYbGxvZzYzMy9CRm9yMEFLSnB3c0VkdmRVaER0ZlYrbVJWRG5wZlpqRzhkQ2xTNk1jLzNrakNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQxLCJhZHZTZWNyZXRLZXkiOiIvcHJWNTcrMFlyRnpxNFRMd0hiVHNQY3hJSC95RFJ3YU1RSDlmNm1uKzNrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgwNzgxMTI4OTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0FERkVEMTdGNDdCRUE0Mzg5NzUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMTA0OTM5OX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiN2xKTUlyb3NRNzJLdXU0UXM3eFNPUSIsInBob25lSWQiOiJjMzZiMTcwMi05NWFiLTRiYjctOWRjMy02OTA1ZGUyZTI1NGMiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUWI2QXNkTFV5Q2N2VnNJRXl4L3pLMnJCT0JnPSJ9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4OFQ0TWIvLytZVEtJS2tDL1BwV0dKeVduTzg9In0sInJlZ2lzdHJhdGlvbiI6e30sImFjY291bnQiOnsiZGV0YWlscyI6IkNJREE5YklIRUtmQzFMUUdHQkVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ5bzVsczdqVFRpQ0N5eWs0UVRZR0l3OTIyY0ZXc2YwaitnQm96OXowaVRBPSIsImFjY291bnRTaWduYXR1cmUiOiI3V2xjN2drQnUwa0xyUTNxL1R6ZjhKV2xLV1l6WWtlSGtOUVErVzVaTVRSMWF3Ti9JR1ZNWG1LM3J6L1JkQTYvUnBJKzN5bERqVitidXVhV2FieVNEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiWWJKSENScGQ5cG5jOVhqb0VLU2MvVGVMbENjb2dodHlKaDBwU282TkZQVmxQWTBtWGFKWlAvNzBIQmF3MHJXdEtYUGxueHNLV1RZS3gxUHhubGlyQmc9PSJ9LCJtZSI6eyJpZCI6IjIzNDgwNzgxMTI4OTE6NzBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQ2Flc2FyIiwibGlkIjoiODgxNTA0MTIxNTI5MjE6NzBAbGlkIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgwNzgxMTI4OTE6NzBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY3FPWmJPNDAwNGdnc3NwT0VFMkJpTVBkdG5CVnJIOUkvb0FhTS9jOUlrdyJ9fV0sInBsYXRmb3JtIjoic21iaSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxMDQ5Mzk2LCJsYXN0UHJvcEhhc2giOiIxeWhJUkEiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUQrYyJ9',
    PREFIXE: process.env.PREFIX || "!",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "2348078112891",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
