const LoadMoreBtn = ({ state, fetchDataFun }) => {

  if (state !== null &&  state.results.length) {
    
    
    
    return (
      <div>
        <button className="text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-5"
        onClick={() => fetchDataFun({ page: state.page + 1 })}>
            Load More
        </button>
      </div>
    );
  }
    return null;
};
export default LoadMoreBtn;