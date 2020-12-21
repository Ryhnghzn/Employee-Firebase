import { SQLite,SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private db : SQLiteObject;
  items : any;
  search_value : string;

  constructor(public sql : SQLite, public router : Router, public navCtrl : NavController) {

  }
  ngOnInit(){
    
   
  }

  itemClicked(id){
    let data = {
      id: id
    };
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(data)
      }
    };
    this.router.navigate(['view-data'], navigationExtras);
  }

  getData(){
     
    console.log("getting data")

    this.sql.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    
    
        db.executeSql('select * from PEGAWAI',[])
          .then((data) => {   
            console.log(data)
            this.items = data;

          })
          .catch(e => console.log(e));
    
    
      })
      .catch(e => console.log(e));

  }

  ionViewDidEnter(){
    console.log("generate..")
    this.sql.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    
      
    
        db.executeSql('create TABLE IF NOT EXISTS PEGAWAI(id INTEGER PRIMARY KEY AUTOINCREMENT, nama_pegawai text,'
                +'nik text,jenis_kelamin text,tgl_lahir text,created_at text)', [])
          .then(() => {   
            console.log("creating table pegawai")
            this.getData();

          })
          .catch(e => console.log(e));
          db.executeSql('select * from PEGAWAI',[])
          .then((data) => {   
            console.log(data)
            this.items = data;

          })
          .catch(e => console.log(e));
    
      })
      .catch(e => console.log(e));



  }

  addDataClicked(){
    this.navCtrl.navigateForward('add-data');
  }


}
