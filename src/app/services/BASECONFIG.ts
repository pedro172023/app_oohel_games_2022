import {HttpHeaders} from "@angular/common/http";

export class BASECONFIG {
    URL_SERVER = ''
    VERSION_API =''
    BASEURL='http://74.208.108.220:8078/api/v1/';
    httpOptions = {
        headers: {
            "accept": "application/json"
        }
    };

    constructor() {
        
    }

    setUrlServer(x){
        this.URL_SERVER = 'http://74.208.108.220:8078'
        this.VERSION_API ='/api/v1/'
        this.BASEURL = this.URL_SERVER + this.VERSION_API;
    }
}
