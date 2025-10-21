export function testQlty(a: number): number{
    let total = 0;
    if(a > 0){
        for(a; a > -1; a++){
            total += a;
        }
    } else {
        for(a; a < 1; a--){
            total += a;
        }
    }
    return total;
}
