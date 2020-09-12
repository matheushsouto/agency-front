export class Constants {
    static MSG_SAVED = 'Salvo com sucesso';
}

export class Route {
    static LOGIN = 'auth/login';
    static USER = 'user';
    static USER_RECOVER_PASSWORD = 'auth/recover-password';
    static USER_MODULE_PERMISSION = 'user/module/permission';
    static USER_MODULE = 'user/module';
    static USER_MODULE_USER = 'user/module-user';
    static PERSONA_GUEST = 'persona/guest';
    static PERSONA_AGENT = 'persona/agent';
    static PERSONA_ATTENDANT = 'persona/attendant';
    static PERSONA_MANAGER = 'persona/manager';
    static BOOKING_HOTEL = 'booking/hotel';
    static BOOKING_BEDROOM = 'booking/bedroom';
    static BOOKING_RESERVA = 'booking/reserva';
    static UTILITY_STATE_CITY = 'utility/state/city';
    static UTILITY_STATE = 'utility/state';
}

export class Permission {
    static WEB_MASTER = 1;
    static PARTNER = 2;
    static PARTNER_CLIENT = 3;
}

export class Table {
    static USER = 'users';
}

export class EventType {
    static PERSONA_GUEST;
    static PERSONA_AGENT;
    static PERSONA_ATTENDANT;
    static PERSONA_MANAGER;
    static BOOKING_HOTEL;
    static BOOKING_BEDROOM;
    static BOOKING_RESERVA;
}
