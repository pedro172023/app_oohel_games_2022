import {Component, OnInit, ViewChild} from '@angular/core';
import { ComunService } from '../services/comun.service';
import {LoadingController, ModalController} from "@ionic/angular";
import {CalendarioEscolarService} from "../services/calendario-escolar.service";
import {ResponseApi} from "../services/ResponseApi";
import {Eventos} from "./eventos";
import {CalendarComponent} from "ionic2-calendar/calendar";


@Component({
    selector: 'app-calendario-escolar',
    templateUrl: './calendario-escolar.page.html',
    styleUrls: ['./calendario-escolar.page.scss'],
})
export class CalendarioEscolarPage implements OnInit {
    eventos: [];
    tipo_evento: [];
    viewTitle;
    eventSource: any[] = [];
    calendar = {
        mode: 'month',
        currentDate: new Date(),
    };
    @ViewChild(CalendarComponent, {static: false}) myCal: CalendarComponent;

    constructor(private modalCtrl: ModalController,
                public loadingController: LoadingController,
                private comunservice: ComunService,
                public calendariService: CalendarioEscolarService) {
        this.calendariService.getCalendario().then((result) => {
            console.log(result);
            if (result == null) {
                this.updateCalendarioEscolar(null);
            } else {
                this.eventos = result.eventos;
                this.tipo_evento = result.tipo_evento;
                this.openCalendar();
            }
        });
    }

    ngOnInit() {
        this.calendariService.inicializar_token();
    }


    onChange($event) {
        console.log($event);
    }

    openCalendar() {
        this.eventSource = [];
        this.eventos.forEach((e: any) => {
            let tipo_evento: any[];
            tipo_evento = this.tipo_evento.filter((et: any) => et.id === e.tipo_evento[0])
            console.log(tipo_evento);
            this.eventSource.push({
                title: `${e.name}`,
                startTime: new Date(e.fecha_inicio),
                endTime: new Date(e.fecha_fin),
                color: `${tipo_evento[0].color}`

            });
        });
        console.log(this.eventSource);
        this.myCal.loadEvents();
    }

    async updateCalendarioEscolar(event) {
        console.log(event);
        const loading = await this.loadingController.create({
            message: 'Por favor espere..',
            duration: 2000
        });
        await loading.present();
        this.calendariService.getCalendarioEscolar().subscribe((res: ResponseApi) => {
            console.log(res);
            this.calendariService.setCalendario(res.data);
            this.eventos = res.data.eventos;
            this.tipo_evento = res.data.tipo_evento;
            this.openCalendar()
            setTimeout(() => {
                console.log('Async operation has ended');
                if (event) {
                    event.target.complete();
                }
                // this.disable_buttos = false
            }, 2000);
        }, ee => {
            console.log(ee);
            if (event) {
                event.target.complete();
            }
            this.comunservice.tokenExpired(ee);
        });
    }

    getCustomClass(events) {
        if (events.length > 0) {
            return events[0].color;
        }
        return '';
    }

    next() {
        var swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slideNext();
    }

    back() {
        var swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slidePrev();
    }


    onEventSelected($event) {

    }

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onTimeSelected($event) {

    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }
}
