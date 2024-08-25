import mongoose from "mongoose";

const shopifyCustomerSchema = new mongoose.Schema({}, { strict: false });
const shopifyProductSchema = new mongoose.Schema({}, { strict: false });
const shopifyOrderSchema = new mongoose.Schema({}, { strict: false });

export const ShopifyCustomer = mongoose.model('shopifyCustomers', shopifyCustomerSchema);
export const ShopifyProduct = mongoose.model('shopifyProducts', shopifyProductSchema);
export const ShopifyOrder = mongoose.model('shopifyOrders', shopifyOrderSchema);