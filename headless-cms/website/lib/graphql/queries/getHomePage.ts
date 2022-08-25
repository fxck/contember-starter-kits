import getFooterMenu from "../partials/getFooterMenu"
import getHeaderMenu from "../partials/getHeaderMenu"
import getSettting from "../partials/getSettings"

const getHomePage = `#graphql
	query {
		getPage(by: {role: homePage}) {
			id
			role
		}
	}
`

export default getHomePage
