export function testQlty(a: number, b: number): number{
    let total = 0;
    for(a; a < b; a--){
        total += a;
    }
    return total;
}