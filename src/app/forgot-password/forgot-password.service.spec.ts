import {TestBed} from '@angular/core/testing';

import {ForgotPasswordService} from './forgot-password.service';

describe('LoginService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ForgotPasswordService = TestBed.get(ForgotPasswordService);
        expect(service).toBeTruthy();
    });
});
