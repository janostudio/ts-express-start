# MongoDB Turotial
##### [采用非关系型数据库](http://www.runoob.com/mongodb/working-with-rockmongo.html)
## 1. 安装步骤
* 官网下载mongodb，安装
* 在D:根目录下新建“data/db”文件夹
* 进入mongoDB安装目录的bin文件夹下，在命令行输入`mongod.exe --dbpath d:\data\db`
* 将mongodb作为windows服务运行
`mongod.exe --logpath "D:\data\dbConf\mongodb.log" --logappend --dbpath "D:\data\db" --port 27107 --serviceName "jealand" --serviceDisplayName "jealand1" --install`
* 需启动第三步后，在新开的cmd且进入bin目录后，可以执行`mongo`。
aws安装
```
设置yum。
- 创建 /etc/yum.repos.d/mongodb-org-3.0.repo
- 输入
[mongodb-org-3.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/3.0/x86_64/
gpgcheck=0
enabled=1
安装
sudo yum install -y mongodb-org
```
## 2. 概念
|SQL术语/概念	|MongoDB术语/概念	|解释/说明|
|---|----|----|
|database	|database	|数据库|
|table	|collection	|数据库表/集合|
|row	|document	|数据记录行/文档|
|column	|field	|数据字段/域|
|index	|index	|索引|
|table joins|	 	|表连接,MongoDB不支持|
|primary key	|primary key	|主键,MongoDB自动将_id字段设置|为主键
## 3. 连接
```
mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]  
mongodb://admin:123456@localhost/test  
mongodb://host1,host2,host3/?connect=direct;slaveOk=true  
```
## 4. 操作
```
mongo //进入数据库  
use newdbs //创建项目数据库   
db.createUser({
    user:"wxapi",
    pwd:"Wxapi.$0dollar",
    roles:[{
        role:"readWrite",
        db:"wxapi"
    }]
}) 
db.createCollection("users")   
db.users.insert({userid: "admin", password: "123456"})    
db.users.insert({title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
})
db.users.find()   
```
* `show dbs` 命令可以显示所有数据的列表
* `db` 命令可以显示当前数据库对象或集合
* `use`命令，可以连接到一个指定的数据库
*  `db.dropDatabase()`删除当前数据库  
* `db.COLLECTION_NAME.insert(document)`