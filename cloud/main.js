Parse.Cloud.define('setUsersAcls', async (request) => {
    const currentUser = request.user;
    currentUser.setACL(new Parse.ACL(currentUser));

    return await currentUser.save(null, { useMasterKey: true });
});

Parse.Cloud.define("createProduct", async(request) => {
    const currentUser = request.user;
    const productName = request.params.productName;
    const productType = request.params.productType;
    const productPrice = request.params.productPrice;
    const productVolume = request.params.productVolume;
    const productWeight = request.params.productWeight;
    const productDescription = request.params.productDescription;
    const productQuantity = request.params.productQuantity ;
    const Product = Parse.Object.extend("Products");
    const product = new Product();

    product.set("createdBy", currentUser);
    product.set("userObjectId", currentUser.id);
    product.set("name", productName);
    product.set("type", productType);
    product.set("price", productPrice);
    product.set("description", productDescription);
    product.set("volume", productVolume);
    product.set("weight", productWeight);
    product.set("quantity", productQuantity);

    return product.save(null, { useMasterKey: true });
});

Parse.Cloud.define("getCurrentUserProducts", (request) => {
    const currentUser = request.user;
    const query = new Parse.Query("Products");

    query.equalTo("createdBy", currentUser);
    query.descending("createdAt");
    query.limit(100);

    return query.find({ useMasterKey: true })
        .then((results) => {
            let resultsArray = [];
            for (let i = 0; i < results.length; i++) {
                const result = results[i].toJSON();
                const {name, price, type, description, volume, weight, quantity, objectId} = result;

                resultsArray.push({name, price, type, volume, weight, description, quantity, objectId});
            }

            return resultsArray;
        }).catch((error) => {
            throw new Error(error.message)
        });
});

Parse.Cloud.define("getAllUsersProducts",  (request) => {
    const query = new Parse.Query("Products");

    query.include("createdBy");
    query.descending("createdAt");
    query.limit(100);

    return query.find({ useMasterKey: true })
        .then((results) => {
            let resultsArray = [];

            for (let i = 0; i < results.length; i++) {
                const result = results[i].toJSON();
                const {name, price, type, description, volume, weight, quantity, objectId, createdBy} = result;

                resultsArray.push({name, price, type, volume, weight, description, quantity, objectId, createdBy: {
                    username: createdBy.username,
                }});
            }

            return resultsArray;
        }).catch((error) => {
            throw new Error(error.message)
        });
});

Parse.Cloud.define("deleteProduct", (request) => {
    const Products = Parse.Object.extend("Products");
    const product = new Parse.Query(Products);

    return product.get(request.params.objectId, { useMasterKey: true })
        .then((p) => {
            return p.destroy({ useMasterKey: true }).then(() => {
                return 'Product removed!'
            }, (error) => {
                throw new Error(error.message)
            })
        }, (error) => {
            throw new Error(error.message)
        });
});