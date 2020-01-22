const AppService = require('../services/AppService');

class AppController {
    index = (req, res) => {
        const response = AppService.boasVindasTestePratico();
        return res.send(response);
    }
}

module.exports = new AppController;