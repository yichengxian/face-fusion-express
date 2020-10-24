const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "请求时间",
      field: "time"
    },
    method: {
      type: DataTypes.STRING(8),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "请求方式",
      field: "method"
    },
    clientIp: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "客户端ip",
      field: "client_ip"
    },
    respTime: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "响应时间",
      field: "resp_time"
    },
    url: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "请求url",
      field: "url"
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "请求状态",
      field: "status"
    },
    userAgent: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "浏览器信息",
      field: "user-agent"
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "token值",
      field: "token"
    },
    params: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "请求参数",
      field: "params"
    },
    resp: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "响应参数",
      field: "resp"
    },
    contentLength: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "请求长度",
      field: "content_length"
    }
  };
  const options = {
    tableName: "req_log",
    comment: "",
    indexes: [{
      name: "time",
      unique: false,
      type: "BTREE",
      fields: ["time"]
    }]
  };
  const ReqLogModel = sequelize.define("reqLogModel", attributes, options);
  return ReqLogModel;
};