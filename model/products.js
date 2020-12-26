class Products {
    constructor (
        id, 
        photo_path, 
        title,
        description,
        status,
        update_count,
        price,
        product_category_id
        ){
            this.id = id;
            this.photo_path = photo_path;
            this.title = title;
            this.description = description;
            this.status = status;
            this.update_count = update_count;
            this.price = price;
            this.product_category_id = product_category_id;
    }
}

export default Products;
