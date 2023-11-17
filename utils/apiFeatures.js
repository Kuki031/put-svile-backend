'use strict';

class Features {
    constructor(model, queryStr) {
        this.model = model;
        this.queryStr = queryStr;
    }

    filter() {
        const objQuery = { ...this.queryStr };
        const filterFields = ["sort", "paginate", "limit", "fields"];
        filterFields.forEach(field => delete objQuery[field]);
        let queryString = JSON.stringify(objQuery);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, (el) => `$${el}`);
        let query = JSON.parse(queryString);
        this.model = this.model.find(query, { _id: 0 });
        return this;
    }

    sort() {
        if (this.queryStr.sort) {
            const sortFields = this.queryStr.sort.split(" ").join(" ");
            this.model = this.model.sort(sortFields);
        } else {
            this.model = this.model.sort("factKey")
        }
        return this;
    }
}

module.exports = Features;