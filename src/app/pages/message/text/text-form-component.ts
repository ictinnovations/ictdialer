import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Http, HttpModule, Response } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Text } from './text';
import { TextService } from './text.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'ngx-add-text-component',
  templateUrl: './text-form-component.html',
  styleUrls: ['./text-form-component.scss'],
})

export class AddTextComponent implements OnInit {

  constructor(private http: Http, private route: ActivatedRoute, private text_service: TextService,
  private router: Router) { }


  form1: any= {};
  text: Text= new Text;
  text_id: any= null;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.text_id = +params['id'];
      const test_url = this.router.url.split('/');
      const lastsegment = test_url[test_url.length - 1];
      if (lastsegment === 'new') {
        return null;
      } else {
        return this.text_service.get_TextData(this.text_id).then(data => {
          this.text = data;
        });
      }
    });
  }

  addText(): void {
    this.text_service.add_Text(this.text).then(response => {
      this.router.navigate(['../../text'], {relativeTo: this.route});
    });
  }

  updateText(): void {
    this.text_service.update_Text(this.text).then(() => {
      this.router.navigate(['../../text'], {relativeTo: this.route});
    })
   .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
