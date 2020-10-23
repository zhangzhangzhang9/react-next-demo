async function test(){
  /*
 * @Author: 张张张
 * @Date: 2020-10-10 14:26:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-10 14:30:01
 * @Description: 
 */
const Redis = require('ioredis');

const redis = new Redis({
  port:6378,
  password:123456
});

const keys = await redis.keys('*');
console.log(keys)
}
test()