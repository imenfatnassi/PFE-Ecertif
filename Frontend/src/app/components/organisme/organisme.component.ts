import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Role } from 'src/app/shared/classes/role';
import { Organisme } from 'src/app/shared/classes/organisme';
import { EnumUtils } from 'src/app/shared/helper/IIteration';
import { OrganismeService } from 'src/app/shared/service/api/Organisme.service';
import { ComponentCrud } from '../componentCrud';

@Component({
  selector: 'app-organisme',
  templateUrl: './organisme.component.html',
  styleUrls: ['./organisme.component.scss'],
    styles: [`
  :host ::ng-deep .p-dialog .Organisme-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
    providers: [MessageService, ConfirmationService]
})

export class OrganismeComponent extends ComponentCrud<Organisme> implements OnInit {
  
  
    roles=new Array(); 

    constructor( service: OrganismeService,  messageService: MessageService,  confirmationService: ConfirmationService,socket: Socket) {
        super(service,messageService,confirmationService,Organisme, socket);
        let iteration = (name : string, value : string | number) : void => {
            this.roles.push(name)
        };
        
    
        EnumUtils.iterate(Role,iteration);
    }

  
    ngOnInit() {

  
  }
       

    }

    



