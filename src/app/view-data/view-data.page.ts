import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.page.html',
  styleUrls: ['./view-data.page.scss'],
})
export class ViewDataPage implements OnInit {


  nik: number;
  nama_pegawai : string;
  jenis_kelamin : string;
  tgl_lahir : string;
  id_pegawai : string;
  private db : SQLiteObject;
  now : any = new Date().toISOString();
  data : any;
  constructor(public navCtrl : NavController, public sql : SQLite, public route : ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.data = JSON.parse(params.data);
        this.id_pegawai = this.data.id
        console.log("id : " + this.id_pegawai)
      }
    });

  }

ionViewDidEnter(){
  this.getData();
}

getData(){
  
  let query2 = "selct * from PEGAWAI where id = " + this.id_pegawai
  this.sql.create({
    name: 'data.db',
    location: 'default'
  })
    .then((db: SQLiteObject) => {


      
      db.executeSql(query2,[]).then((data) => {
          console.log("getting data")
            this.nik = data.nik
            this.nama_pegawai = data.nama_pegawai
            this.tgl_lahir = data.tgl_lahir

        })
        .catch(e => console.log(e));
  
      })
      .catch(e => console.log(e));

    

}





update(){
  
  let query2 = "update into PEGAWAI(nama_pegawai, nik, jenis_kelamin, tgl_lahir,created_at) "
  +"VALUES (?,?,?,?,?) where id = " + this.id_pegawai
  console.log(query2)

  this.sql.create({
    name: 'data.db',
    location: 'default'
  })
    .then((db: SQLiteObject) => {


      
      db.executeSql(query2,[this.nama_pegawai, this.nik, this.jenis_kelamin, this.tgl_lahir, this.now]).then((data) => {

          console.log("update table pegawai") 
          this.navCtrl.pop();

        })
        .catch(e => console.log(e));
  
      })
      .catch(e => console.log(e));

    

}

delete(){
  
  let query2 = "delete from PEGAWAI "
  +"where id = " + this.id_pegawai
  console.log(query2)

  this.sql.create({
    name: 'data.db',
    location: 'default'
  })
    .then((db: SQLiteObject) => {


      
      db.executeSql(query2,[]).then((data) => {

          console.log("delete table pegawai") 
          this.navCtrl.pop();

        })
        .catch(e => console.log(e));
  
      })
      .catch(e => console.log(e));

}

}
