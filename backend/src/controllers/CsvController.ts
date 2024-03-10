import { Request, Response } from "express";
import fs from "fs";
import csvParser from "csv-parser";
import path from "path";

const csvPath = path.join(__dirname, '../../../data.csv');
const pageSize = 100;

export async function getData(req: Request, res: Response) {
  const page = Number(req.query.page) || 1;
  const startRow = (page - 1) * pageSize;

  const data: any = [];
  let currentRow = 0;

  console.log("page: ", page);
  console.log("start: ", startRow);

  const stream = fs.createReadStream(csvPath)
    .pipe(csvParser())
    .on('error', () => {
      console.error("Error on getData");

      return res.status(500).json({
        status: "Error",
        message: "Houve um erro ao ler os dados"
      });
    });
  
  stream.on('data', (row) => {
    if(currentRow >= startRow && currentRow < startRow + pageSize) {
      console.log(row);

      data.push(row);
    }

    currentRow++;

    if(currentRow === startRow + pageSize) stream.destroy();
  });

  stream.on('close', () => {
    res.status(200).json({
      data: data,
    });
  })
}
