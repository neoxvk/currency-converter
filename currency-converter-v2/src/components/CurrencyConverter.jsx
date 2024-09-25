import React, { useEffect, useState } from 'react'
import CurrencyDropdown from './CurrencyDropdown'
import { HiArrowSmRight, HiOutlineArrowNarrowRight, HiOutlineSwitchHorizontal } from 'react-icons/hi'

const CurrencyConverter = () => {

    const [currencies, setCurrencies] = useState([])
    const [amount, setAmount] = useState(1)
    const [fromCurrency, setFromCurrency] = useState("USD")
    const [convertedAmount, setConvertedAmount] = useState(null)
    const [converting, setConverting] = useState(false)
    const [toCurrency, setToCurrency] = useState("INR");
  const [favorites, setFavourites] = useState(JSON.parse(localStorage.getItem("favorites")) || ["INR", "EUR"])
    //https://api.frankfurter.app/currencies
  //https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
  //https://api.frankfurter.app/latest?amount=1&from=USD&to=INR

    const fetchCurrencies = async() => {
        try{
            const fetchData = await fetch('https://api.frankfurter.app/currencies');
            const response = await fetchData.json();

            setCurrencies(Object.keys(response))

        }catch(e){
            console.log("Error in Fetching currenicies", e)
        }

        console.log(currencies)
    }

    useEffect(()=> {
        fetchCurrencies()
    },[])

    const convertCurrency = async() => {
        if(!amount) return;
        setConverting(true);

         try{
            const fetchData = await fetch(
              `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
            const response = await fetchData.json();

            setConvertedAmount(response.rates[toCurrency] + " "+ toCurrency)

        }catch(e){
            console.log("Error in Fetching currenicies", e)
        }
        finally{setConverting(false)}
    }

    const handleFavorites = (currency) => {
        //Add to Favourites
        let updatedFavorites = [...favorites];
        
        if(favorites.includes(currency)){
            updatedFavorites = updatedFavorites.filter((fav)=> fav!== currency);

        }else{
            updatedFavorites.push(currency)
        }

        setFavourites(updatedFavorites)
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    }

    const swapCurrencies = () => {
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
    }

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
        CurrencyConverter
      </h2>

      <div className="dropdowns grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencyDropdown
          currencies={currencies}
          favorites={favorites}
          title="From"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          handleFavorites={handleFavorites}
        />
        {/* Swap currency Button  */}
        <div className="flex justify-center -mb:5 sm:mb-0">
          <button
            onClick={swapCurrencies}
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
            <HiOutlineSwitchHorizontal className="text-xl text-gray-700" />
          </button>
        </div>
        <CurrencyDropdown
          currencies={currencies}
          favorites={favorites}
          title="To"
          currency={toCurrency}
          setCurrency={setToCurrency}
          handleFavorites={handleFavorites}
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700">
          Amount:
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          type="number"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={convertCurrency}
          className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
          ${converting ? "animate-pulse" : ""}`}>
          Convert
        </button>
      </div>

      {convertedAmount && (
        <div className="converted-amount mt-4 text-lg font-medium text-right text-green-600">
          Converted Amount:{convertedAmount}
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter