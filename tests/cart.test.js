'use strict';

const Cart = require('../classes/Cart');
const Product = require('../classes/Product');

describe('Cart Tests', () => {

    describe('Cart Properties', () => {
        let instance;
        beforeEach(() => {
            instance = new Cart();
        });
        it('should have an `items` property which is an array', () => {
            
            expect(Array.isArray(instance.items)).toBe(true);
        });
        it('should have a `total` property which is a number', () => {

            expect(typeof instance.total === 'number').toBe(true);
        });
        it('should have a `fee` property which is a number', () => {

            expect(typeof instance.fee === 'number').toBe(true);
        });
    });

    describe('Cart Methods', () => {
        let instance;
        beforeEach(() => {
            instance = new Cart();
        });
        it('`addToCart()` should add a valid Product instance to the `items` array', () => {
            instance.addToCart({ product: new Product({ name: 'Test', price: 50, id: 1 }), quantity: 1});
            expect(instance.items.length === 1).toBe(true);
        });
        it('`addToCart()` should not add duplicate products', () => {
            instance.addToCart({ product: new Product({ name: 'Test', price: 50, id: 1 }), quantity: 1});
            instance.addToCart({ product: new Product({ name: 'Test', price: 50, id: 1 }), quantity: 1});
            expect(instance.items.length === 1).toBe(true);
        });
        it('`calculateTotal()` should calculate the cart total', () => {
            instance.addToCart({ product: new Product({ name: 'Test', price: 50, id: 1 }), quantity: 1});
            instance.addToCart({ product: new Product({ name: 'Test 2', price: 50, id: 2 }), quantity: 2});
            instance.calculateTotal();

            expect(instance.total).toEqual(150);
        });
        it('`calculateTotal()` should be called after adding a product', () => {
            instance.addToCart({ product: new Product({ name: 'Test', price: 50, id: 1 }), quantity: 1});
            instance.addToCart({ product: new Product({ name: 'Test 2', price: 50, id: 2 }), quantity: 1});

            expect(instance.total).toEqual(100);
        });
        it('`calculateTotal()` should take the cart fee into account', () => {
            instance.fee = 10;
            instance.addToCart({ product: new Product({ name: 'Test', price: 50, id: 1 }), quantity: 1});
            instance.addToCart({ product: new Product({ name: 'Test 2', price: 50, id: 2 }), quantity: 1});
            
            expect(instance.total).toEqual(110);
        });
        it('`removeItem()` remove a product from the cart and recalculates total', () => {
            instance.addToCart({ product: new Product({ name: 'Test', price: 50, id: 1 }), quantity: 1});
            instance.addToCart({ product: new Product({ name: 'Test 2', price: 50, id: 2 }), quantity: 1});
            instance.removeItem(2);
            expect(instance.items.length).toEqual(1);
            expect(instance.total).toEqual(50);
        });

        it('`updateCart()` updates the quantity of a given product and recalculates total', () => {
            instance.addToCart({ product: new Product({ name: 'Test', price: 50, id: 1 }), quantity: 1});
            instance.addToCart({ product: new Product({ name: 'Test 2', price: 50, id: 2 }), quantity: 1});
            instance.updateCart({ id: 2, quantity: 3});
            expect(instance.items[1].quantity).toEqual(3);
            expect(instance.total).toEqual(200);
        });

        it('`updateCart()` should not update the quantity if it is 0', () => {
            instance.addToCart({ product: new Product({ name: 'Test', price: 50, id: 1 }), quantity: 1});
            instance.addToCart({ product: new Product({ name: 'Test 2', price: 50, id: 2 }), quantity: 1});
            instance.updateCart({ id: 2, quantity: 0});
            expect(instance.items[1].quantity).toEqual(1);
            expect(instance.total).toEqual(100);
        });
    });
});