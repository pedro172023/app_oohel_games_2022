import {HttpHeaders} from "@angular/common/http";

export class BASECONFIG {
    URL_SERVER = ''
    VERSION_API =''
    BASEURL='http://192.168.100.5:8075/api/v1/';
    httpOptions = {
        headers: {
            "accept": "application/json"
        }
    };

    constructor() {
        
    }

    setUrlServer(URL_SERVER){
        this.URL_SERVER = 'http://192.168.100.5:8075'
        this.VERSION_API ='/api/v1/'
        this.BASEURL = this.URL_SERVER + this.VERSION_API;
    }
}
