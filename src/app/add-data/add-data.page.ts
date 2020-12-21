import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.page.html',
  styleUrls: ['./add-data.page.scss'],
})
export class AddDataPage implements OnInit {

  nik: number;
  nama_pegawai : string;
  jenis_kelamin : string;
  tgl_lahir : string;
  private db : SQLiteObject;
  now : any = new Date().toISOString();
  constructor(public navCtrl : NavController, public sql : SQLite) { }

  ngOnInit() {
    
  }

  save(){
  
    let query2 = "insert into PEGAWAI(nama_pegawai, nik, jenis_kelamin, tgl_lahir,created_at) "
    +"VALUES (?,?,?,?,?)"
    console.log(query2)

    this.sql.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {


        
        db.executeSql(query2,[this.nama_pegawai, this.nik, this.jenis_kelamin, this.tgl_lahir, this.now]).then((data) => {

            console.log("creating table pegawai") 
            this.navCtrl.pop();

          })
          .catch(e => console.log(e));
    
        })
        .catch(e => console.log(e));

      
 
  }

  submitClicked(){
   
  }
    

}
