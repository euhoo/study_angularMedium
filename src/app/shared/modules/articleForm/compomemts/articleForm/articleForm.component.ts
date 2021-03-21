import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleInputInterface } from '../../../../types/articleInput.interface';
import { BackendErrorsInterface } from '../../../../types/backendErrors.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'mc-article-form',
  templateUrl: './articleForm.component.html',
  styleUrls: ['./articleForm.component.scss'],
})
export class ArticleFormComponent implements OnInit {
  @Input('initialValues') initialValuedProps: ArticleInputInterface;
  @Input('isSubmitting') isSubmittingProps: boolean;
  @Input('errors') errorsProps: BackendErrorsInterface | null;

  @Output('articleSubmit')
  articleSubmitEvent = new EventEmitter<ArticleInputInterface>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initValues();
  }
  initValues(): void {
    this.form = this.fb.group({
      title: this.initialValuedProps.title,
      description: this.initialValuedProps.description,
      body: this.initialValuedProps.body,
      tagList: this.initialValuedProps.tagList.join(' '),
    });
  }
  onSubmit(): void {
    this.articleSubmitEvent.emit(this.form.value);
  }
}
