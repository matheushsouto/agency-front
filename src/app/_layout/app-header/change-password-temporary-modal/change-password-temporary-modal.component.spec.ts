import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChangePasswordTemporaryModalComponent} from './change-password-temporary-modal.component';

describe('ChangePasswordModalComponent', () => {
    let component: ChangePasswordTemporaryModalComponent;
    let fixture: ComponentFixture<ChangePasswordTemporaryModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChangePasswordTemporaryModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangePasswordTemporaryModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
