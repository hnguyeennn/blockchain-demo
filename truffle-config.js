module.exports = {
  networks: {
      development: {
          host: "127.0.0.1",
          port: 7545, // Đảm bảo rằng cổng này khớp với cổng Ganache đang chạy
          network_id: "*", // Match any network id
          gas: 6721975, // Gas limit mặc định
          gasPrice: 20000000000 // 20 Gwei (Giá gas mặc định)
      }
  },
  compilers: {
      solc: {
          version: "0.8.0" // Đảm bảo rằng phiên bản này khớp với phiên bản bạn sử dụng
      }
  }
};
