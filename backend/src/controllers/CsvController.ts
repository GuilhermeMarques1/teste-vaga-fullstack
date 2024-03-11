import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { ICsvRow } from "../types/IData";
import { FormatData } from "../Helpers/FormatCsv";
import { ValidateCpfCnpj } from "../Middleware/ValidateCpfCnpj";

const csvPath = path.join(__dirname, '../../../data.csv');
const pageSize = 1000;

export async function getData(req: Request, res: Response) {
  const page = Number(req.query.page) || 1;
  const startRow = (page - 1) * pageSize;

  const data: ICsvRow[] = [];
  let currentRow = 0;

  const stream = fs.createReadStream(csvPath)
    .pipe(csvParser())
    .on('error', () => {
      console.error("Error on getData");

      return res.status(500).json({
        status: "Error",
        message: "Houve um erro ao ler os dados"
      });
    });
  
  stream.on('data', (row: ICsvRow) => {
    if (
        currentRow >= startRow && 
        currentRow < startRow + pageSize &&
        ValidateCpfCnpj(row.nrCpfCnpj)
      ) 
    {
      const formattedRow = FormatData(row);

      data.push(formattedRow);
    }

    if(data.length === startRow + pageSize) stream.destroy();
  });

  stream.on('close', () => {
    res.status(200).json(data);
  })
}
