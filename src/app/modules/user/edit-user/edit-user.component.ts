import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {


    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {

    }

}
