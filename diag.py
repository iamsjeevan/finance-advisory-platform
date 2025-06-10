from diagrams import Cluster, Diagram, Edge
from diagrams.aws.general import User
from diagrams.generic.compute import Rack
from diagrams.programming.flowchart import Database

# Create the diagram with left-to-right direction and save as a PNG
with Diagram("System Architecture", show=False, direction="LR", outformat="png", filename="system_architecture"):

    # Presentation Layer with lighter color and bold text
    with Cluster("Presentation Layer (React.js + Redux)", graph_attr={"bgcolor": "#ADD8E6"}):
        search = Rack("Search Interface", fontweight="bold")
        leaderboard = Rack("Leaderboard Display", fontweight="bold")
        plan_ui = Rack("Plan Generator UI", fontweight="bold")
        dashboard = Rack("User Dashboard", fontweight="bold")

    # Application Layer with lighter color and bold text
    with Cluster("Application Layer (Controllers & Services)", graph_attr={"bgcolor": "#90EE90"}):
        session = Rack("User Session Manager", fontweight="bold")
        router = Rack("Request Router", fontweight="bold")
        validator = Rack("Bio Validator", fontweight="bold")
        planner = Rack("Investment Planner", fontweight="bold")
        rl_handler = Rack("RL Handler", fontweight="bold")
        signal_ctrl = Rack("Signal Controller", fontweight="bold")

    # Business Logic Layer with lighter color and bold text
    with Cluster("Business Logic Layer (Core Engine)", graph_attr={"bgcolor": "#FFFFE0"}):
        rating = Rack("Bio Rating Engine", fontweight="bold")
        reco = Rack("Recommendation Generator", fontweight="bold")
        mrd = Rack("Regime Detector (MRD)", fontweight="bold")
        signal_proc = Rack("Signal Processor", fontweight="bold")
        tuner = Rack("RL Weight Tuner (TD3)", fontweight="bold")

    # Data Access Layer with lighter color and bold text
    with Cluster("Data Access Layer (Standalone APIs)", graph_attr={"bgcolor": "#FFB6C1"}):
        score = Rack("Bio Score Service", fontweight="bold")
        profile = Rack("User Profile Service", fontweight="bold")
        regime = Rack("Regime Sequence Service", fontweight="bold")
        stock = Rack("Stock Data Service", fontweight="bold")
        news = Rack("News Sentiment API", fontweight="bold")
        yahoo = Rack("Yahoo Finance API", fontweight="bold")
        nsdl = Rack("NSDL/ETF Feeds", fontweight="bold")
        alpha = Rack("Alpha Vantage API", fontweight="bold")
        model_store = Rack("RL Model Store", fontweight="bold")

    # Data Storage with lighter color and bold text
    with Cluster("Data Storage (PostgreSQL)", graph_attr={"bgcolor": "#D3D3D3"}):
        bio = Database("bio_home", fontweight="bold")
        user = Database("user", fontweight="bold")
        label = Database("regime_label", fontweight="bold")
        signal = Database("signal_values", fontweight="bold")
        prices = Database("stock_prices", fontweight="bold")
        weights = Database("rl_weights", fontweight="bold")
        recommendation = Database("recommendation", fontweight="bold")

    # Example edges to show relationships
    search >> Edge(label="requests") >> router
    router >> Edge(label="validates") >> validator
    validator >> Edge(label="plans") >> planner
    planner >> Edge(label="generates") >> reco
    reco >> Edge(label="stores") >> recommendation