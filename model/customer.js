class Customer {
    constructor(
        id,
        first_name, 
        last_name, 
        middle_name, 
        home_address, 
        street_address, 
        country_region, 
        contact_number, 
        city, 
        state_province, 
        postal, 
        role, 
        verified, 
        email, 
        password){
            this.id = id;
            this.first_name = first_name;
            this.last_name = last_name;
            this.middle_name = middle_name;
            this.home_address = home_address;
            this.street_address = street_address;
            this.country_region = country_region;
            this.contact_number = contact_number;
            this.city = city;
            this.state_province = state_province;
            this.postal = postal;
            this.role = role;
            this.verified = verified;
            this.email = email;
            this.password = password;
    }
}

export default Customer;


