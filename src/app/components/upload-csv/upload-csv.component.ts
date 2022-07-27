import { Component, OnInit, ViewChild } from '@angular/core';
import { CsvModel } from 'src/app/model/csv-model';

@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.scss']
})
export class UploadCsvComponent implements OnInit {
  public records: CsvModel[] = [];
  public valorTotal: number | undefined;
  @ViewChild('csvReader') csvReader: any;

  constructor() { }

  ngOnInit(): void {

  }

  uploadListener(event: any): void {
    let files = event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      let input = event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const csvData: any = reader.result;
        const csvRecordsArray: any[] = (csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any[], headerLength: any) {
    let csvArr: Array<CsvModel> = [];
    let totalIdade: number[] = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (csvRecordsArray[i]).split(',');

      if (curruntRecord.length == headerLength) {
        let csvRecord: CsvModel = new CsvModel();
        csvRecord.id = curruntRecord[0];
        csvRecord.firstName = curruntRecord[1].trim();
        csvRecord.lastName = curruntRecord[2].trim();
        csvRecord.age = curruntRecord[3];
        csvRecord.position = curruntRecord[4].trim();
        csvRecord.mobile = curruntRecord[5].trim();

        csvArr.push(csvRecord);

        totalIdade.push(Number(curruntRecord[3]));

        this.valorTotal = totalIdade.reduce((valorAcumulado, proximoValor) => {
          return valorAcumulado + proximoValor
        })
      }
    }
    console.log('VALOR TOTAL', this.valorTotal);
    console.log('TESTE', csvArr);
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any[]) {
    let headers = (csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
  }

}
