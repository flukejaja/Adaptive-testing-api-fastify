const testing = require('../src/handler/example/function');

test('R = 0 , W = 1 , L = 1', () => {
    expect(testing.standard_error(0,1,1)).toBe(38.1);
});
test('R = 0 , W = 2 , L = 2', () => {
    expect(testing.standard_error(0,2,2)).toBe(33.7);
});
test('R = 0 , W = 3 , L = 3', () => {
    expect(testing.standard_error(0,3,3)).toBe(32.5);
});
test('R = 0 , W = 4 , L = 4', () => {
    expect(testing.standard_error(0,4,4)).toBe(31.9);
});
test('R = 0 , W = 5 , L = 5', () => {
    expect(testing.standard_error(0,5,5)).toBe(31.6);
});
test('R = 1 , W = 5 , L = 6', () => {
    expect(testing.standard_error(1,5,6)).toBe(24.9);
});
test('R = 1 , W = 6 , L = 7', () => {
    expect(testing.standard_error(1,6,7)).toBe(24.7);
});
test('R = 1 , W = 7 , L = 8', () => {
    expect(testing.standard_error(1,7,8)).toBe(24.4);
});
test('Estimate _measure = ถ้า H = 20 L = 10 R = 7 W = 3' , () =>{
    expect(testing._measure(20,10,7,3)).toBe(2.8473);
})
test('Estimate_sterr = R = 7 , W = 3 , L = 10', () => {
    expect(testing.sterr(7,3,10)).toBe(0.69007);
});
