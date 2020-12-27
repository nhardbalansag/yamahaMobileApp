class Products {
    constructor (
        id, 
        photo_path, 
        title,
        description,
        price,
        product_category_id,
        created_at
        ){
            this.id = id;
            this.photo_path = photo_path;
            this.title = title;
            this.description = description;
            this.price = price;
            this.product_category_id = product_category_id;
            this.created_at = created_at;
    }
}

export default Products;
