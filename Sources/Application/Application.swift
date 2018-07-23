import Foundation
import Kitura
import LoggerAPI
import Configuration
import CloudEnvironment
import KituraContracts
import Health
import KituraStencil

public let projectPath = ConfigurationManager.BasePath.project.path
public let health = Health()

public class App {
    let router = Router()
//    let cloudEnv = CloudEnv()
    
    public init() throws {
        // Run the metrics initializer
//        initializeMetrics(router: router)
    }
    
    func postInit() throws {
        // Endpoints
        initializeHealthRoutes(app: self)
        initializeWebRoutes(app: self)
    }
    
    public func run() throws {
        try postInit()
        Kitura.addHTTPServer(onPort: 8080, with: router)
        Kitura.run()
    }
}
