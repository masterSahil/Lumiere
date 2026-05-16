import Head from 'next/head';

export default function CheckoutPage() {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        body { 
          font-family: 'Manrope', sans-serif; 
          background-color: #131314; 
          color: #e5e2e3; 
        }
        h1, h2, h3, .font-serif { 
          font-family: 'Playfair Display', serif; 
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .glass-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(132, 204, 22, 0.3);
        }
      `}} />

      <div className="min-h-screen selection:bg-[#84cc16] selection:text-[#062100]">
        
        {/* Navigation/Header */}
        <header className="border-b border-[#4d4635]/30 py-6">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="text-2xl font-bold tracking-widest text-[#84cc16] uppercase font-serif">Lumière</div>
            <a className="text-sm uppercase tracking-widest text-[#e5e2e3] hover:text-[#84cc16] transition-colors" href="#">Back to Menu</a>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12">
          
          {/* Progress Stepper */}
          <nav aria-label="Progress" className="mb-16">
            <ol className="flex items-center justify-center space-x-8 md:space-x-12" role="list">
              <li className="flex items-center space-x-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#09530d] text-[#7fc673] text-sm font-bold">
                  <span className="material-symbols-outlined text-sm">check</span>
                </span>
                <span className="text-sm font-semibold uppercase tracking-wider text-[#e5e2e3]">Cart</span>
              </li>
              <li className="w-12 h-px bg-[#4d4635]"></li>
              <li className="flex items-center space-x-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#84cc16] text-[#062100] text-sm font-bold">2</span>
                <span className="text-sm font-semibold uppercase tracking-wider text-[#84cc16]">Information</span>
              </li>
              <li className="w-12 h-px bg-[#4d4635]"></li>
              <li className="flex items-center space-x-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#99907c] text-[#99907c] text-sm font-bold">3</span>
                <span className="text-sm font-semibold uppercase tracking-wider text-[#99907c]">Payment</span>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Delivery & Payment Details */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Delivery Section */}
              <section>
                <div className="flex items-center space-x-4 mb-8">
                  <span className="material-symbols-outlined text-[#84cc16]">local_shipping</span>
                  <h2 className="text-2xl font-serif font-medium tracking-tight text-[#e5e2e3]">Delivery Details</h2>
                </div>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#99907c] mb-2">Full Name</label>
                    <input 
                      className="w-full bg-[#1c1b1c] border border-[#4d4635] rounded-lg p-4 focus:ring-1 focus:ring-[#84cc16] focus:border-[#84cc16] text-[#e5e2e3] placeholder-[#d0c5af]/50 outline-none transition-shadow" 
                      placeholder="Julianne Moore" 
                      type="text" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#99907c] mb-2">Phone Number</label>
                    <input 
                      className="w-full bg-[#1c1b1c] border border-[#4d4635] rounded-lg p-4 focus:ring-1 focus:ring-[#84cc16] focus:border-[#84cc16] text-[#e5e2e3] placeholder-[#d0c5af]/50 outline-none transition-shadow" 
                      placeholder="+1 (555) 000-0000" 
                      type="tel" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#99907c] mb-2">Email</label>
                    <input 
                      className="w-full bg-[#1c1b1c] border border-[#4d4635] rounded-lg p-4 focus:ring-1 focus:ring-[#84cc16] focus:border-[#84cc16] text-[#e5e2e3] placeholder-[#d0c5af]/50 outline-none transition-shadow" 
                      placeholder="julianne@example.com" 
                      type="email" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#99907c] mb-2">Shipping Address</label>
                    <textarea 
                      className="w-full bg-[#1c1b1c] border border-[#4d4635] rounded-lg p-4 focus:ring-1 focus:ring-[#84cc16] focus:border-[#84cc16] text-[#e5e2e3] placeholder-[#d0c5af]/50 outline-none transition-shadow" 
                      placeholder="Apartment, suite, or unit number" 
                      rows={3} 
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#99907c] mb-2">Delivery Instructions (Optional)</label>
                    <input 
                      className="w-full bg-[#1c1b1c] border border-[#4d4635] rounded-lg p-4 focus:ring-1 focus:ring-[#84cc16] focus:border-[#84cc16] text-[#e5e2e3] placeholder-[#d0c5af]/50 outline-none transition-shadow" 
                      placeholder="e.g. Leave by the front gate" 
                      type="text" 
                    />
                  </div>
                </form>
              </section>

              <hr className="border-[#4d4635]/30" />

              {/* Payment Section */}
              <section>
                <div className="flex items-center space-x-4 mb-8">
                  <span className="material-symbols-outlined text-[#84cc16]">account_balance_wallet</span>
                  <h2 className="text-2xl font-serif font-medium tracking-tight text-[#e5e2e3]">Payment Method</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Credit Card */}
                  <label className="relative cursor-pointer">
                    <input defaultChecked className="peer sr-only" name="payment" type="radio" />
                    <div className="glass-card p-6 rounded-xl flex flex-col items-center justify-center space-y-3 transition-all peer-checked:ring-2 peer-checked:ring-[#84cc16] peer-checked:bg-[#84cc16]/5 h-full">
                      <span className="material-symbols-outlined text-3xl text-[#e5e2e3]">credit_card</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#e5e2e3]">Credit Card</span>
                    </div>
                  </label>
                  
                  {/* Apple Pay */}
                  <label className="relative cursor-pointer">
                    <input className="peer sr-only" name="payment" type="radio" />
                    <div className="glass-card p-6 rounded-xl flex flex-col items-center justify-center space-y-3 transition-all peer-checked:ring-2 peer-checked:ring-[#84cc16] peer-checked:bg-[#84cc16]/5 h-full">
                      <svg className="h-8 w-auto fill-current text-[#e5e2e3]" viewBox="0 0 512 210">
                        <path d="M495.2 4.4C480.1 23.3 472.1 47.9 473.4 75.3c1.4 30.1 13.5 56.4 33.3 75.6-1.5 4.3-3.1 8.7-4.8 13.1-13.9 36.1-36.9 76.9-80.4 76.9-19.6 0-32.9-10.9-56.1-10.9s-38 10.9-56.3 10.9c-46 0-78.3-48.4-97.4-104.9-18.4-54.6-21.6-114-1.6-149C227.4 51.5 258.8 30 293.4 30c23.2 0 40.5 11.4 57 11.4 16.3 0 35.5-12.7 63.8-12.7 18.2 0 38.6 4.9 57.6 15.6-32.3 22-38.3 67-31.5 90.7 8.3 28.5 27.5 49.6 46.2 59.8-5.3 15-11.4 29.8-18.5 44.3-13.6 27.6-28.1 55.4-53.1 55.4-23.7 0-29.6-14.9-57.8-14.9-28.4 0-35.3 14.7-57.6 14.7-24.8 0-41.9-29.5-55.5-57.3-27.7-56.7-31.9-138.8 8.6-174.5 21.6-19.1 51.7-30.8 81.1-30.8 24.3 0 47.2 9.5 62.4 9.5 13.9 0 35.8-10.8 63.7-10.8 12.1 0 24.5 2.1 36.6 6.5l.5-1.5c-44-1.1-66.2 30-66.2 60.5 0 29.6 21.4 56.7 64 58.7l.5.2c-.8 2.3-1.6 4.6-2.5 6.9-4.8 12.4-11.1 26.5-19.3 41.5-7.7 14-16.1 28.3-25.1 41.6-4.9 7.3-10.1 14.7-15.5 22.1"></path>
                      </svg>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#e5e2e3]">Apple Pay</span>
                    </div>
                  </label>
                  
                  {/* Razorpay */}
                  <label className="relative cursor-pointer">
                    <input className="peer sr-only" name="payment" type="radio" />
                    <div className="glass-card p-6 rounded-xl flex flex-col items-center justify-center space-y-3 transition-all peer-checked:ring-2 peer-checked:ring-[#84cc16] peer-checked:bg-[#84cc16]/5 h-full">
                      <span className="material-symbols-outlined text-3xl text-[#e5e2e3]">payments</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#e5e2e3]">Razorpay</span>
                    </div>
                  </label>
                </div>

                {/* Card Input Placeholder */}
                <div className="mt-8 bg-[#1c1b1c] p-6 rounded-xl border border-[#4d4635]/50 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#99907c] mb-2">Card Number</label>
                    <div className="relative">
                      <input 
                        className="w-full bg-[#201f20] border border-[#4d4635] rounded-lg p-4 focus:ring-1 focus:ring-[#84cc16] focus:border-[#84cc16] text-[#e5e2e3] outline-none transition-shadow" 
                        placeholder="0000 0000 0000 0000" 
                        type="text" 
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-2">
                        <span className="w-8 h-5 bg-blue-600 rounded-sm"></span>
                        <span className="w-8 h-5 bg-orange-500 rounded-sm"></span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-[#99907c] mb-2">Expiry Date</label>
                      <input 
                        className="w-full bg-[#201f20] border border-[#4d4635] rounded-lg p-4 focus:ring-1 focus:ring-[#84cc16] focus:border-[#84cc16] text-[#e5e2e3] outline-none transition-shadow" 
                        placeholder="MM / YY" 
                        type="text" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-[#99907c] mb-2">CVV</label>
                      <input 
                        className="w-full bg-[#201f20] border border-[#4d4635] rounded-lg p-4 focus:ring-1 focus:ring-[#84cc16] focus:border-[#84cc16] text-[#e5e2e3] outline-none transition-shadow" 
                        placeholder="123" 
                        type="text" 
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5">
              <div className="sticky top-12 bg-[#201f20] p-8 rounded-2xl border border-[#4d4635]/30 shadow-lg">
                <h2 className="text-2xl font-serif font-medium tracking-tight mb-8 text-[#e5e2e3]">Order Summary</h2>
                
                {/* Item List */}
                <div className="space-y-6 mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-[#2a2a2b]">
                      <img 
                        alt="Beef Wellington" 
                        className="h-full w-full object-cover" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn1EkvJWtb5GyzJUhGSc-G-4aKEOtBwT2hzqSjlg4rVpJ_BdMspH4cdkilk6CoQ-V8nTIugpcNdaUT9jSwNhJRDxUSwNg0VlJ6PVdW6DIWfn5ahv-8dkoS56-2wejx5KifNtDNlhoMPuztOCz6E9zUIBghV1qv0W9QH1GWUe6jQ5ZnLZxJOEVKbVZ14dlYFPWRKxELG48X2JjX-sqv9-2P3ByGJe5nTUzprYloWgRpx_FOFujfd983gn5wN1YXDIW9MP2qukiS8DxV" 
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#e5e2e3]">Lumière Beef Wellington</h4>
                      <p className="text-sm text-[#d0c5af]">Signature Edition</p>
                      <p className="text-sm font-semibold mt-1 text-[#e5e2e3]">1 × $85.00</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-[#2a2a2b]">
                      <img 
                        alt="Truffle Pasta" 
                        className="h-full w-full object-cover" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYUcUV2fY78NDkdO9PWeHsg34UQMNoDO1VMGo-4FISqMrY9h4qSrC1OKzXDhkveFxM1z7BvS1MXpnxQBNrr6uXjWkEqyEMVn_XnUkpJlPLmssjJsOzQ-dEPWnRIUZTrZw-tr2WqKB71VKDThAh1yYXmQq4s0mbYEHtYAYZJKLi-GRHSZvN2ZLR8IGb2ilkuvNTmXJ9-nq8mmpwn72N7xubIkTnDA1fo_7hu82wxtYazbTzA_TeTGmZS4WCnFyiGBcrkRKZWTMQu4k0" 
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#e5e2e3]">Black Truffle Tagliatelle</h4>
                      <p className="text-sm text-[#d0c5af]">Hand-rolled pasta</p>
                      <p className="text-sm font-semibold mt-1 text-[#e5e2e3]">2 × $42.00</p>
                    </div>
                  </div>
                </div>
                
                <hr className="border-[#4d4635]/30 mb-8" />
                
                {/* Price Breakdown */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[#d0c5af]">
                    <span>Subtotal</span>
                    <span>$169.00</span>
                  </div>
                  <div className="flex justify-between text-[#d0c5af]">
                    <span>Service Charge (10%)</span>
                    <span>$16.90</span>
                  </div>
                  <div className="flex justify-between text-[#d0c5af]">
                    <span>Delivery Fee</span>
                    <span>$12.00</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-4 border-t border-[#4d4635]/30">
                    <span className="text-[#e5e2e3]">Total</span>
                    <span className="text-[#84cc16] font-bold">$197.90</span>
                  </div>
                </div>
                
                {/* Place Order Button */}
                <button className="w-full bg-[#84cc16] hover:bg-opacity-90 text-[#062100] font-bold py-5 rounded-lg text-sm uppercase tracking-widest shadow-xl shadow-[#84cc16]/20 transition-all active:scale-[0.98]">
                  Place Order
                </button>
                
                <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-[#d0c5af]/60">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span className="uppercase tracking-widest">End-to-end encrypted secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-24 border-t border-[#4d4635]/20 py-12 text-center text-xs text-[#d0c5af]/40 uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} Lumière Fine Dining. All Rights Reserved.
        </footer>
      </div>
    </>
  );
}