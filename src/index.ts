import config from './config';
import logger from './utils/logger';

logger.info(
  `配置加载成功 - 端口: ${config.port}, 环境: ${config.env}, 数据库: ${config.db.path}`,
);

import app from './app';

const server = app.listen(config.port, () => {
  logger.info(`🚀 服务器已启动: http://localhost:${config.port}`);
});

export default server;
