class TransactionDataInformation{
    constructor(id, purchaseAmount, photo_path, title, description, price, transactionStatus){
        this.id = id;
        this.purchaseAmount = purchaseAmount;
        this.photo_path = photo_path;
        this.title = title;
        this.description = description;
        this.price = price;
        this.transactionStatus = transactionStatus;
    }
}

export default TransactionDataInformation;