module.exports.handler = async (event) => {
	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				message: "Meu deus esse lambda é meu realreal",
				TITULO: siteTitle,
				input: event,
			},
			null,
			2
		),
	};
};
