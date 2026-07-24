# 主程序
if __name__ == "__main__":
    # 1. 准备数据
    stock_data = {
        'AAPL': aapl_df,
        'AMZN': amzn_df,
        'GOOG': goog_df,
        'INTC': intc_df
    }
    
    # 2. 初始化算法
    algo = ExecutionAlgorithm()
    
    # 3. 准备数据集
    prepared_data = algo.prepare_data(stock_data)
    
    # 4. 获取市场状态因子
    market_state_factors = {
        'AAPL_market_state_factors': AAPL_market_state_factors,
        'AMZN_market_state_factors': AMZN_market_state_factors,
        'GOOG_market_state_factors': GOOG_market_state_factors,
        'INTC_market_state_factors': INTC_market_state_factors
    }
    
    # 5. 存储所有股票的最优权重
    optimal_weights = {}
    
    # 6. 运行回测并记录每个股票的最优权重
    results = {}
    for stock_name, data in prepared_data.items():
        print(f"\nProcessing {stock_name}...")
        
        test_df = data['test']
        factor_name = f"{stock_name}_market_state_factors"
        
        if factor_name not in market_state_factors:
            print(f"Warning: No factors found for {stock_name}, skipping...")
            continue
            
        factors = market_state_factors[factor_name]
        
        # 计算TWAP基准
        twap = algo.calculate_twap(test_df)
        
        # 优化买入策略权重
        print(f"Optimizing buy weights for {stock_name}...")
        buy_weights = algo.optimize_weights(test_df, factors, is_buy=True)
        
        # 优化卖出策略权重
        print(f"Optimizing sell weights for {stock_name}...")
        sell_weights = algo.optimize_weights(test_df, factors, is_buy=False)
        

        # 使用优化后的权重执行交易
        buy_trades = algo.execute_trade(test_df, factors, is_buy=True)
        sell_trades = algo.execute_trade(test_df, factors, is_buy=False)
        
        # 评估性能
        buy_performance = algo.evaluate_performance(buy_trades, twap, is_buy=True)
        sell_performance = algo.evaluate_performance(sell_trades, twap, is_buy=False)
        
        # 存储结果
        results[stock_name] = {
            'buy': {**buy_performance, 'weights': buy_weights},
            'sell': {**sell_performance, 'weights': sell_weights},
            'trades': {
                'buy': buy_trades,
                'sell': sell_trades
            }
        }
        
        # 存储最优权重
        optimal_weights[stock_name] = {
            'buy': buy_weights,
            'sell': sell_weights
        }
        
        # 打印结果
        algo.print_results(stock_name, results[stock_name])
    
    # 7. 打印所有股票的最优权重总结
    print("\n=== Optimal Weights Summary ===")
    for stock_name, weights in optimal_weights.items():
        print(f"\n{stock_name}:")
        print("Buy Strategy Weights:")
        for factor, weight in weights['buy'].items():
            print(f"  {factor}: {weight:.4f}")
        print("\nSell Strategy Weights:")
        for factor, weight in weights['sell'].items():
            print(f"  {factor}: {weight:.4f}")
    
    # 8. 计算并打印整体性能指标
    print("\n=== Overall Performance ===")
    total_trades = 0
    total_improvement = 0
    
    for stock_name, result in results.items():
        buy_sharpe = result['buy']['vs_twap'] / result['buy']['std_price']
        sell_sharpe = result['sell']['vs_twap'] / result['sell']['std_price']
        total_trades += result['buy']['num_trades'] + result['sell']['num_trades']
        total_improvement += (buy_sharpe + sell_sharpe) / 2
        
    avg_improvement = total_improvement / len(results)
    print(f"Average Sharpe Ratio Improvement: {avg_improvement:.4f}")
    print(f"Total Number of Trades: {total_trades}")