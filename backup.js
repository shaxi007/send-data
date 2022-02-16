const { execute } = require("@getvim/execute");
const dotenv = require("dotenv");
const FormData = require("form-data");
const Fetch = require("cross-fetch");

dotenv.config();
const username = process.env.DB_USERNAME;
const database = process.env.DB_NAME;
const pass = process.env.PGPASS;
const date = new Date();
const fs = require("fs");
const path = require("path");
const currentDate = `${date.getFullYear()}.${
  date.getMonth() + 1
}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
const fileName = `database-backup-${currentDate}`;

function backup() {
  execute(
    `PGPASSWORD="${pass}" pg_dump -h localhost -U ${username} ${database}  > ${fileName}.sql`
  )
    .then(async () => {
      const buff = fs.createReadStream(path.join(__dirname, fileName + ".sql"));
      uploadFile(buff);
      console.log("Finito");
    })
    .catch((err) => {
      console.log(err);
    });
}

backup();

async function uploadFile(buffer) {
  const formdata = new FormData();
  formdata.append("file", buffer, {
    contentType: "image/jpeg",
    filename: fileName + ".jpg",
  });
  const response = await Fetch("https://telegra.ph/upload", {
    method: "POST",
    body: formdata,
  });
  console.log(await response.json());
}
