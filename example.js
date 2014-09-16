$.ajax({

	///url: 'http://origin-api.macys.com/v3/catalog/reviews?productId=77589',
	
	url: 'http://origin-api.macys.com/v3/catalog/category/5449/browseproducts?resultsperpage=10&sortby=price&sortorder=asc&imagewidth=300',
	//set headers with your key and select json
	headers: {
		'Accept':'application/json',
		'X-Macys-Webservice-Client-Id': 'neohack14'
	},
	success: function(data) {
		var allProducts = data.category[0].product.product;
		var myImg = $('<img>').attr('src', allProducts[0].image[0].imageurl);
		$('body').append(myImg);
		console.log(allProducts[0].price.current.value)
		$('body').append("<span>" + "$" + allProducts[0].price.current.value + "</span>")
	}
})

