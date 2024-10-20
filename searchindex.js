var relearn_searchindex = [
  {
    "breadcrumb": "",
    "content": "This is a new chapter.",
    "description": "This is a new chapter.",
    "tags": [],
    "title": "Kafka",
    "uri": "/kafka/index.html"
  },
  {
    "breadcrumb": "Kafka",
    "content": "阅读 Kafka官方文档的 Design 部分，理解 Kafka 的设计理念。",
    "description": "阅读 Kafka官方文档的 Design 部分，理解 Kafka 的设计理念。",
    "tags": [],
    "title": "Kafka设计原理",
    "uri": "/kafka/design/index.html"
  },
  {
    "breadcrumb": "",
    "content": "计算机基础。",
    "description": "计算机基础。",
    "tags": [],
    "title": "数据结构与算法",
    "uri": "/leetcode/index.html"
  },
  {
    "breadcrumb": "",
    "content": "This is a new chapter.",
    "description": "This is a new chapter.",
    "tags": [],
    "title": "Java",
    "uri": "/java/index.html"
  },
  {
    "breadcrumb": "Kafka",
    "content": "为了更好的学习和理解Kafka的工作原理，使用Kafka的Producer API和Consumer API来进行消息的生产和消费。\n安装启动Kafka 可以参考Kafka的安装\nProducer API生产 + 命令行消费 先启动命令行消费工具，可以看到topic的历史消息：\n$ bin/kafka-console-consumer.sh --topic iamabug-test --from-beginning --bootstrap-server localhost:9092 tomorrow will be better never say never 中国 然后用Producer API编写生产代码，核心代码如下：\n// 配置broker地址和消息KV类型 Properties props = new Properties(); props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, \"localhost:9092\"); props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName()); props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName()); KafkaProducer\u003cString, String\u003e producer = new KafkaProducer\u003c\u003e(props); String topic = \"iamabug-test\"; String key = \"key\"; String value = \"I am back\"; // 组装消息并发送 ProducerRecord\u003cString, String\u003e record = new ProducerRecord\u003c\u003e(topic, key, value); producer.send(record); producer.close(); 主要的依赖就是 org.apache.kafka:kafka-clients:3.8.0。\n不出意外的话，就可以在命令行看到最新消息：\n$ bin/kafka-console-consumer.sh --topic iamabug-test --from-beginning --bootstrap-server localhost:9092 tomorrow will be better never say never 中国 I am back 说明使用Producer API发送消息成功。\n命令行生产 + Consumer API消费 先编写 Consumer 的代码：\n// 同样配置broker地址和消息类型 // consumer比produer多了group ID String groupId = \"my-group\"; String topic = \"iamabug-test\"; Properties props = new Properties(); props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, \"localhost:9092\"); props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName()); props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName()); props.put(ConsumerConfig.GROUP_ID_CONFIG, groupId); // consumer首次消费数据时偏移量的处理策略配置 props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, \"earliest\"); // 订阅指定topic KafkaConsumer\u003cString, String\u003e consumer = new KafkaConsumer\u003c\u003e(props); consumer.subscribe(java.util.Collections.singletonList(topic)); // consumer的死循环消费框架 while(true){ ConsumerRecords\u003cString, String\u003e records = consumer.poll(100); for(ConsumerRecord\u003cString, String\u003e record : records){ System.out.println(record.value()); } 运行之后可以消费到topic已有的消息：\nSLF4J: Failed to load class \"org.slf4j.impl.StaticLoggerBinder\". SLF4J: Defaulting to no-operation (NOP) logger implementation SLF4J: See http://www.slf4j.org/codes.html#StaticLoggerBinder for further details. ## 因为忽略了Logger，所以有上面3行提示 tomorrow will be better never say never 中国 I am back 然后在命令行生产数据，同时观察consumer：\n$ bin/kafka-console-producer.sh --topic iamabug-test --bootstrap-server localhost:9092 \u003emessage from console again 可以看到几乎同时，consumer获取到最新消息：\ntomorrow will be better never say never 中国 I am back message from console again 总结 通过编写Producer和Consumer API的基本框架，对Kafka生产和消费的过程有了进一步的了解，两个命令行工具：kafka-console-producer.sh 和 kafka-console-consumer.sh 应该就是调用了这两套代码。",
    "description": "为了更好的学习和理解Kafka的工作原理，使用Kafka的Producer API和Consumer API来进行消息的生产和消费。\n安装启动Kafka 可以参考Kafka的安装\nProducer API生产 + 命令行消费 先启动命令行消费工具，可以看到topic的历史消息：\n$ bin/kafka-console-consumer.sh --topic iamabug-test --from-beginning --bootstrap-server localhost:9092 tomorrow will be better never say never 中国 然后用Producer API编写生产代码，核心代码如下：\n// 配置broker地址和消息KV类型 Properties props = new Properties(); props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, \"localhost:9092\"); props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName()); props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName()); KafkaProducer\u003cString, String\u003e producer = new KafkaProducer\u003c\u003e(props); String topic = \"iamabug-test\"; String key = \"key\"; String value = \"I am back\"; // 组装消息并发送 ProducerRecord\u003cString, String\u003e record = new ProducerRecord\u003c\u003e(topic, key, value); producer.send(record); producer.close(); 主要的依赖就是 org.apache.kafka:kafka-clients:3.8.0。",
    "tags": [],
    "title": "使用Kafka API",
    "uri": "/kafka/client-101/index.html"
  },
  {
    "breadcrumb": "Java",
    "content": "JDK的安装配置是Java开发和大数据相关工作的常见步骤，至关重要。\n版本选择：考虑到历史包袱，JDK8目前还是主流； Oracle vs OpenJDK：如果没有特殊需求，OpenJDK； 安装OpenJDK apt直接安装：\n$ sudo apt install openjdk-8-jdk # 查看验证： $ java -version openjdk version \"1.8.0_422\" OpenJDK Runtime Environment (build 1.8.0_422-8u422-b05-1~24.04-b05) OpenJDK 64-Bit Server VM (build 25.422-b05, mixed mode) 配置环境变量 环境变量必不可少，一般来说安装路径是固定的，不过也可以查找确认：\n$ whereis java java: /usr/bin/java /usr/share/java /usr/share/man/man1/java.1.gz # 这是个软链接 $ ls -l /usr/bin/java lrwxrwxrwx 1 root root 22 7月 22 05:59 /usr/bin/java -\u003e /etc/alternatives/java # 还是软链接 $ ls -l /etc/alternatives/java lrwxrwxrwx 1 root root 46 7月 22 05:59 /etc/alternatives/java -\u003e /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java # 到头了 $ ls -l /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java -rwxr-xr-x 1 root root 14632 7月 22 05:59 /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java 由此可以确定Java的根目录为/usr/lib/jvm/java-8-openjdk-amd64/，在 /etc/profile 或者 .bash_profile 或者 .bashrc 或者其他类似的配置文件中添加如下内容：\nexport JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar export PATH=$JAVA_HOME/bin:$PATH 保存后重新登陆，或者对配置文件source一下就可以生效。",
    "description": "JDK的安装配置是Java开发和大数据相关工作的常见步骤，至关重要。\n版本选择：考虑到历史包袱，JDK8目前还是主流； Oracle vs OpenJDK：如果没有特殊需求，OpenJDK； 安装OpenJDK apt直接安装：\n$ sudo apt install openjdk-8-jdk # 查看验证： $ java -version openjdk version \"1.8.0_422\" OpenJDK Runtime Environment (build 1.8.0_422-8u422-b05-1~24.04-b05) OpenJDK 64-Bit Server VM (build 25.422-b05, mixed mode) 配置环境变量 环境变量必不可少，一般来说安装路径是固定的，不过也可以查找确认：\n$ whereis java java: /usr/bin/java /usr/share/java /usr/share/man/man1/java.1.gz # 这是个软链接 $ ls -l /usr/bin/java lrwxrwxrwx 1 root root 22 7月 22 05:59 /usr/bin/java -\u003e /etc/alternatives/java # 还是软链接 $ ls -l /etc/alternatives/java lrwxrwxrwx 1 root root 46 7月 22 05:59 /etc/alternatives/java -\u003e /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java # 到头了 $ ls -l /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java -rwxr-xr-x 1 root root 14632 7月 22 05:59 /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java 由此可以确定Java的根目录为/usr/lib/jvm/java-8-openjdk-amd64/，在 /etc/profile 或者 .bash_profile 或者 .bashrc 或者其他类似的配置文件中添加如下内容：",
    "tags": [],
    "title": "JDK8的安装配置",
    "uri": "/java/install-jdk8/index.html"
  },
  {
    "breadcrumb": "Kafka",
    "content": "打开Kafka官网的quickstart页面：https://kafka.apache.org/quickstart，边读边照做，不理解的去搜索。\n0. 确认Java环境 如果没有安装Java环境，可以参考Java环境安装\n1. 下载Kafka 可以从页面上下载，也可以用 wget：\n$ wget https://dlcdn.apache.org/kafka/3.8.0/kafka_2.13-3.8.0.tgz 下载之后解压到合适位置：\n$ tar xvf kafka_2.13-3.8.0.tgz $ pwd /home/iamabug/workspace 2. 启动Kafka 官网上给出了四种启动方式，分别是：\nKRaft Zookeeper 基于JVM的docker镜像 基于GraalVM的docker镜像 出于实用性考虑，目前只关注前两种方式。\n2.1 KRaft方式启动 简单的来说，KRaft移除了Zookeeper，将元信息的管理放在集群内，简化了系统架构，在稳定性、安全性等方便带来好处。\n$ pwd /home/iamabug/workspace/kafka_2.13-3.8.0 # 生成一个集群ID，用于Kraft一致性协议，如果不需要一个有意义的集群ID，可以用自带工具随机生成 $ KAFKA_CLUSTER_ID=mycluster $ KAFKA_CLUSTER_ID=\"$(bin/kafka-storage.sh random-uuid)\" $k echo $KAFKA_CLUSTER_ID 2e2c8L1FTeSbJSqTq8ISeQ 然后格式化日志目录:\n$ bin/kafka-storage.sh format -t $KAFKA_CLUSTER_ID -c config/kraft/server.properties Formatting /tmp/kraft-combined-logs with metadata.version 3.8-IV0. 可以看到这一步的作用是根据配置文件初始化了/tmp/kraft-combined-logs目录，查看目录下的文件内容：\n$ ls /tmp/kraft-combined-logs/ bootstrap.checkpoint meta.properties ## bootstrap.checkpoint不是可读文件，查看meta.properties $ cat /tmp/kraft-combined-logs/meta.properties # #Fri Oct 18 14:35:45 CST 2024 cluster.id=mycluster version=1 directory.id=Mo0S_N719s7Tw_GVSKS9Vw node.id=1 注释 [TODO] 这里产生个问题，这一步初始化是所有的broker都需要，还是只有controller才需要？\n最后启动Kafka：\n$ bin/kafka-server-start.sh config/kraft/server.properties 不出意外将输出大量日志，最后几行的内容如下：\n[2024-10-18 14:59:16,941] INFO Kafka version: 3.8.0 (org.apache.kafka.common.utils.AppInfoParser) [2024-10-18 14:59:16,941] INFO Kafka commitId: 771b9576b00ecf5b (org.apache.kafka.common.utils.AppInfoParser) [2024-10-18 14:59:16,941] INFO Kafka startTimeMs: 1729234756940 (org.apache.kafka.common.utils.AppInfoParser) [2024-10-18 14:59:16,942] INFO [KafkaRaftServer nodeId=1] Kafka Server started (kafka.server.KafkaRaftServer) 这表明broker已经正常启动，虽然只有一个节点。\n2.2 Zookeeper方式启动 这是传统方式，需要两个终端，第一个终端启动Zookeeper：\n$ bin/zookeeper-server-start.sh config/zookeeper.properties ## 如下为部分日志 [2024-10-18 15:08:42,825] INFO Snapshot taken in 0 ms (org.apache.zookeeper.server.ZooKeeperServer) [2024-10-18 15:08:42,832] INFO PrepRequestProcessor (sid:0) started, reconfigEnabled=false (org.apache.zookeeper.server.PrepRequestProcessor) [2024-10-18 15:08:42,832] INFO zookeeper.request_throttler.shutdownTimeout = 10000 ms (org.apache.zookeeper.server.RequestThrottler) [2024-10-18 15:08:42,844] INFO Using checkIntervalMs=60000 maxPerMinute=10000 maxNeverUsedIntervalMs=0 (org.apache.zookeeper.server.ContainerManager) [2024-10-18 15:08:42,845] INFO ZooKeeper audit is disabled. (org.apache.zookeeper.audit.ZKAuditProvider) 另一个终端启动broker：\n$ bin/kafka-server-start.sh config/server.properties ## 下面为部分日志 [2024-10-18 15:09:30,868] INFO Kafka version: 3.8.0 (org.apache.kafka.common.utils.AppInfoParser) [2024-10-18 15:09:30,869] INFO Kafka commitId: 771b9576b00ecf5b (org.apache.kafka.common.utils.AppInfoParser) [2024-10-18 15:09:30,869] INFO Kafka startTimeMs: 1729235370867 (org.apache.kafka.common.utils.AppInfoParser) [2024-10-18 15:09:30,869] INFO [KafkaServer id=0] started (kafka.server.KafkaServer) 信息 可以看到，Zookeeper方式用的config目录下的配置文件，而KRaft方式使用的config/kraft目录下的配置文件\n3. 验证Kafka 在单节点的Kraft方式启动的Kafka上测试创建Topic、生产数据和消费数据等功能。\n3.1 创建topic 启动Kafka后，用 kafka-topics.sh 命令行工具创建topic：\n$ bin/kafka-topics.sh --create --topic iamabug-test --bootstrap-server localhost:9092 Created topic iamabug-test. 使用 describe 子命令可以看到新建的 topic 的更多细节：\n$ bin/kafka-topics.sh --describe --topic iamabug-test --bootstrap-server localhost:9092 ## 第一行输出为Topic信息 ## 第二行输出为Partiontion信息，此Topic只有一个Partiontion Topic: iamabug-test\tTopicId: 7UYTFwG6Qbylh_ccU6VoEQ\tPartitionCount: 1\tReplicationFactor: 1\tConfigs: segment.bytes=1073741824 Topic: iamabug-test\tPartition: 0\tLeader: 1\tReplicas: 1\tIsr: 1\tElr: LastKnownElr: 3.2 向topic生产消息 用 kafka-console-producer.sh 工具生产消息\n$ bin/kafka-console-producer.sh --topic iamabug-test --bootstrap-server localhost:9092 \u003etomorrow will be better \u003enever say never \u003e中国 \u003e^C% ## 用 Ctrl+C 停止 3.3 从topic消费消息 用到的工具为 kafka-console-consumer.sh：\n$ bin/kafka-console-consumer.sh --topic iamabug-test --from-beginning --bootstrap-server localhost:9092 tomorrow will be better never say never 中国 ## 这里仍然在等待新消息，需要用 Ctrl+C 手动中断 如果需要删除 topic，使用 kafka-topics.sh 工具的 delete 命令：\n$ bin/kafka-topics.sh --delete --topic iamabug-test --bootstrap-server localhost:9092 ## 正常删除没有输出",
    "description": "打开Kafka官网的quickstart页面：https://kafka.apache.org/quickstart，边读边照做，不理解的去搜索。\n0. 确认Java环境 如果没有安装Java环境，可以参考Java环境安装\n1. 下载Kafka 可以从页面上下载，也可以用 wget：\n$ wget https://dlcdn.apache.org/kafka/3.8.0/kafka_2.13-3.8.0.tgz 下载之后解压到合适位置：\n$ tar xvf kafka_2.13-3.8.0.tgz $ pwd /home/iamabug/workspace 2. 启动Kafka 官网上给出了四种启动方式，分别是：\nKRaft Zookeeper 基于JVM的docker镜像 基于GraalVM的docker镜像 出于实用性考虑，目前只关注前两种方式。\n2.1 KRaft方式启动 简单的来说，KRaft移除了Zookeeper，将元信息的管理放在集群内，简化了系统架构，在稳定性、安全性等方便带来好处。\n$ pwd /home/iamabug/workspace/kafka_2.13-3.8.0 # 生成一个集群ID，用于Kraft一致性协议，如果不需要一个有意义的集群ID，可以用自带工具随机生成 $ KAFKA_CLUSTER_ID=mycluster $ KAFKA_CLUSTER_ID=\"$(bin/kafka-storage.sh random-uuid)\" $k echo $KAFKA_CLUSTER_ID 2e2c8L1FTeSbJSqTq8ISeQ 然后格式化日志目录:\n$ bin/kafka-storage.sh format -t $KAFKA_CLUSTER_ID -c config/kraft/server.properties Formatting /tmp/kraft-combined-logs with metadata.version 3.8-IV0. 可以看到这一步的作用是根据配置文件初始化了/tmp/kraft-combined-logs目录，查看目录下的文件内容：\n$ ls /tmp/kraft-combined-logs/ bootstrap.checkpoint meta.properties ## bootstrap.checkpoint不是可读文件，查看meta.properties $ cat /tmp/kraft-combined-logs/meta.properties # #Fri Oct 18 14:35:45 CST 2024 cluster.id=mycluster version=1 directory.id=Mo0S_N719s7Tw_GVSKS9Vw node.id=1 注释 [TODO] 这里产生个问题，这一步初始化是所有的broker都需要，还是只有controller才需要？",
    "tags": [],
    "title": "Kafka的基础安装使用",
    "uri": "/kafka/install/index.html"
  },
  {
    "breadcrumb": "",
    "content": "",
    "description": "",
    "tags": [],
    "title": "类别",
    "uri": "/categories/index.html"
  },
  {
    "breadcrumb": "",
    "content": "",
    "description": "",
    "tags": [],
    "title": "标签",
    "uri": "/tags/index.html"
  }
]
