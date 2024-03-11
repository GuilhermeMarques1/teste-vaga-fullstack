import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { ICsvRow } from "../types/IData";
import { FormatData } from "../Helpers/FormatCsv";
import { ValidateCpfCnpj } from "../Middleware/ValidateCpfCnpj";

const csvPath = path.join(__dirname, '../../../data.csv');
const pageSize = 10;

function countLines(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    let totalLines = 0;
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row: ICsvRow) => {
        if(ValidateCpfCnpj(row.nrCpfCnpj)) totalLines++;
      })
      .on('end', () => resolve(totalLines))
      .on('error', (error) => reject(error));
  });
}

export async function getData(req: Request, res: Response) {
  const page = Number(req.query.page) || 1;
  const startRow = (page - 1) * pageSize;

  const data: ICsvRow[] = [];

  const totalLines = await countLines(csvPath);
  const totalPages = Math.ceil(totalLines/pageSize)

  const stream = fs.createReadStream(csvPath)
    .pipe(csvParser())
    .on('error', () => {
      console.error("Error on getData");

      return res.status(500).json({
        status: "Error",
        message: "Houve um erro ao ler os dados"
      });
    });
  
  let countData = 0;
  stream.on('data', (row: ICsvRow) => {
    if(startRow == 0 && ValidateCpfCnpj(row.nrCpfCnpj)) {
      const formattedRow = FormatData(row);
  
      data.push(formattedRow);
    } else {
      if(ValidateCpfCnpj(row.nrCpfCnpj)) {
        countData++;
        if(countData > pageSize*(page-1)) {
          const formattedRow = FormatData(row);
    
          data.push(formattedRow);
        }
      }
    }

    if(data.length === pageSize) stream.destroy();
  });

  stream.on('close', () => {
    res.status(200).json({
      data,
      totalPages
    });
  })
}
