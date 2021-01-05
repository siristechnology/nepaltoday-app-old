import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, Text } from 'react-native'
import { withStyles } from '@ui-kitten/components/theme'
import { useScrollToTop } from '@react-navigation/native'

import { ArticleListItem } from './article.component'
import { getReadArticles } from '../../../../services/asyncStorageService'
import { useTheme } from 'react-native-paper'

const ArticleListComponent = React.memo(({ eva, articles, onItemPress, onShowMoreModal, refreshing, handleRefresh, headerComponent }) => {
	const [readArticles, setReadArticles] = useState([])

	useEffect(() => {
		getReadArticles().then((res) => {
			setReadArticles(res)
		})
	}, [])

	const _onItemPress = (article) => {
		onItemPress(article)
	}

	const renderItem = ({ item, index }) => {
		return (
			// <ArticleListItem
			// 	index={index}
			// 	isRead={readArticles.filter((x) => x.articleId == item._id).length}
			// 	style={[eva.style.item,{borderBottomColor: theme.colors.lightBackground}]}
			// 	article={item}
			// 	onShowMoreModal={onShowMoreModal}
			// 	onPress={() => _onItemPress(item)}
			// />
			<Text>Shiva{index}</Text>
		)
	}

	const ref = React.useRef(null)
	useScrollToTop(ref)
	const theme = useTheme()
	articles = [
		{
		  "_id": "5fec57af54b73616406554a7",
		  "title": "नेकपा वाग्मती प्रदेश संसदीय दलको नेतामा शाक्य, पौडेललाई हटाइयो",
		  "shortDescription": "पुस ९ गते पार्टी मुख्यालय पेरिसडाँडामा बसेको दाहाल–नेपाल सूमहको बैठकले संसदीय दलको नेतामा शाक्यलाई चयन गरेको भए पनि त्यस विषयमा प्रदेशसभा तथा मुख्यमन्त्री डोरमणि पौडेललाई जानकारी गराइएको थिएन ।",
		  "content": "मकवानपुर — नेकपा वाग्मती प्रदेश संसदीय दलको नेतामा अष्टलक्ष्मी शाक्यलाई चयन गरेको विषयमा दाहाल–नेपाल सूमहले प्रदेशसभा सचिवालयलाई जानकारी गराउने भएको छ ।,पुस ९ गते पार्टी मुख्यालय पेरिसडाँडामा बसेको दाहाल–नेपाल सूमहको बैठकले संसदीय दलको नेतामा शाक्यलाई चयन गरेको भए पनि त्यस विषयमा प्रदेशसभा तथा मुख्यमन्त्री डोरमणि पौडेललाई जानकारी गराइएको थिएन ।\n\nबुधबार वाग्मती प्रदेशको प्रस्तावित मुख्यमन्त्री शाक्यले बोलाएको प्रदेश संसदीय दलको बैठकले शाक्यलाई सर्वसम्मत रुपमा दलको नेता चयन गरिएको हो । बैठकले मुख्यमन्त्री रहेका पौडेललाई नेकपा संसदीय दलको नेताबाट हटाइएको विषयमा प्रदेशसभा सचिवालय र मुख्यमन्त्री पौडेललाई जानकारी गराउने निर्णय गरेको छ ।\n\nप्रधानमन्त्री केपी शर्मा ओली पक्षका मुख्यमन्त्री पौडेलले नेकपा संसदीय दलका उपनेता शालिकराम जम्कट्टेल र सचेतक बुद्धिमान माझीलाई कारबाही गर्दै पदमुक्त गरेपछि दाहा–नेपाल समुहको बैठक बसेको हो । मुख्यमन्त्री पौडेलले आफूविरुद्ध प्रदेशसभामा दर्ता गरिएको अविश्वासको प्रस्तावमा हस्ताक्षर गर्ने ३० जना प्रदेशसभा सदस्यहरुलाई २४ घण्टाभित्र जवाफ दिने गरी मंगलबार स्पष्टिकरण सोधेका थिए । ‘अब मुख्यमन्त्री पौडेल हाम्रो संसदीय दलको नेता होइन । मेरो पक्षमा बहुमत सदस्य रहेका छन्,’ शाक्यले भनिन् । उनले पेरिसडाँडामा बसेको बैठकले मुख्यमन्त्री पौडेलले संसदीय दलको नेताको हैसियतले सोधेको प्रश्नको जवाफ नदिन समेत सांसदहरुलाई आग्रह गरेको बताइन् ।\n\n‘मुख्यमन्त्री अब संसदीय दलका नेता होइनन् । उनीसँग स्पष्टिकरण सोध्ने अधिकार पनि छैन । त्यसकारण यस विषयमा जवाफ दिनुपर्दैन भनेर हामीले निर्णय गरेका छौं ।, उनले दलको उपनेता र सचेतकलाई कारबाही गर्ने अधिकार पनि मुख्यमन्त्री पौडेलसँग नरहेको दाबी गरिन् । दाहाल–नेपाल समूहका प्रदेशसभा सदस्यले पुस १० गते शुक्रबार मुख्यमन्त्री पौडेलविरुद्ध अविश्वास प्रस्ताव दर्ता गराएका थिए । वाग्मती प्रदेशमा नेकपाको कूल ८० मत रहेको भए पनि प्रधानमन्त्री ओली पक्षका मुख्यमन्त्री पौडलसँग ३४ र प्रचण्ड–नेपाल समूहसँग ४६ मत रहेको छ ।\n\nमुख्यमन्त्री पौडेलले आफूलाई कारबाही गर्नै नसक्ने जीकिर नेकपा संसदीय दलका उपनेता शालिकराम जम्कट्टेलले गरेका छन् । मुख्यमन्त्रीलाई संसदीय दलको नेताबाट पदमुक्त गरेर प्रदेशसभामा अविश्वासको प्रस्ताव दर्ता गराइसकेको अवस्थामा आफूहरुलाई क",
		  "link": "https://ekantipur.com/pradesh-3/2020/12/30/160932227401081641.html",
		  "imageLink": "https://assets-cdn-api.kantipurdaily.com/thumb.php?src=https://assets-cdn-np.kantipurdaily.com/uploads/source/news/kantipur/2020/politics/ashthalaxmishakyancpleader02-3072020031013-1000x0.jpg&w=1000&h=0",
		  "source": {
			"_id": "ekantipur",
			"name": "कान्तिपुर",
			"url": null,
			"category": null,
			"link": null,
			"logoLink": "https://assets-cdn-api.kantipurdaily.com/thumb.php?src=https://assets-cdn-np.kantipurdaily.com/uploads/source/news/kantipur/2020/politics/ashthalaxmishakyancpleader02-3072020031013-1000x0.jpg&w=1000&h=0"
		  },
		  "category": "headline",
		  "publishedDate": "1609324463806",
		  "createdDate": "1609324463806",
		  "modifiedDate": "1609324463806",
		  "topic": "headline",
		  "tags": [
			"प्रचण्ड",
			"केपी शर्मा ओली"
		  ],
		  "totalWeight": 27,
		  "dislikes": [],
		  "likes": []
		},
		{
		  "_id": "5fec57af54b73616406554a6",
		  "title": "'प्रचण्डले जहिल्यै महाविपत्ति ल्याउनुहुन्छ' : भट्ट",
		  "shortDescription": "दाहाल-माधवकुमार नेपालहरू सडकमा 'हामी यहाँ छौं' भनिरहेको प्रति व्यंग गर्दै बुधबार काठमाडौंमा आयोजित कार्यक्रममा भट्टले भने, 'उहाँहरूलाई हामीले खोज्न जानुपर्ने स्थिति छ, कहाँ हुनुहुन्छ भनेर । देशका कुनाकाप्चामा कहाँ कहाँ हुनुहुन्छ भनेर खोज्नुपर्ने दायित्व प्रधानमन्त्रीले हामीलाई दिनुभएको छ ।'",
		  "content": "काठमाडौँ — नेकपाका स्थायी समिति सदस्य (केपी ओली पक्ष) एवं उद्योग मन्त्री लेखराज भट्टले अध्यक्ष पुष्पकमल दाहालले जहिले पनि मुलुकमा महाविपत्ति ल्याउने गरेको आरोप लगाएका छन् । ओली पक्षका सुदूरपश्चिम प्रदेशका कार्यकर्ताहरूको भेलामा भट्टले संघीयता र गणतन्त्रको रक्षा गर्नका लागि प्रधानमन्त्रीसँग काँध मिलाएको बताए । ,दाहाल-माधवकुमार नेपालहरू सडकमा 'हामी यहाँ छौं' भनिरहेको प्रति व्यंग गर्दै बुधबार काठमाडौंमा आयोजित कार्यक्रममा भट्टले भने, 'उहाँहरूलाई हामीले खोज्न जानुपर्ने स्थिति छ, कहाँ हुनुहुन्छ भनेर । देशका कुनाकाप्चामा कहाँ कहाँ हुनुहुन्छ भनेर खोज्नुपर्ने दायित्व प्रधानमन्त्रीले हामीलाई दिनुभएको छ ।'\n\n'पार्टी, संघीयता र गणतन्त्रको रक्षा गर्न प्रधानमन्त्रीसँग काँध मिलाएका छौं,' भट्टले भने । पार्टीमा सैद्धान्तिक, वैचारिक, सांगठनिक समस्या के हो भन्ने कहिँ पनि छलफल नभएको भन्दै उनले त्यसको दोष दाहाल नेपाल पक्षको भएको बताए । \n\nदाहालले पूर्वमाओवादीलाई एमालेसँग एकता गर्दा ओलीलाई आफूले नचिनेको र भन्दै विश्वासघात गरिएको बताए । 'एकता हुँदा मैले चिनेको प्रचण्डलाई थिएँ । केपीलाई चिनाउने प्रचण्ड हुन् । विश्वासघात प्रचण्डले गर्नुभयो कि हामीले गरेका थियौं ?,' उनले थपे, 'विश्व कम्युनिस्ट आन्दोलदनको सुनौलो इतिहास हामीले लेखेका छौं । एक नम्बरमा अध्यक्ष ओली, दोस्रोमा म आलोपालो अध्यक्षता गर्छौ । ऐतिहासिक घडीमा हामीलाई साथ दिनुपर्छ भन्नुभयो । अहिले सडकमा आउ भन्नुहुन्छ । कसमा विचलन भएको छ ?'\n\nभट्टले पूर्वमाओवादी एक बनौं भन्न नमिल्ने बताए । उनले एमाले र माओवादी विगत भइसकेकाले अहिले ओलीको अगुवाइमा अगाडि बढ्नुपर्ने धारणा राखे । 'हामी पूर्वमाओवादी यता भन्ने हो भने माधवकुमार नेपाललाई यता पठाइदिनुपर्‍यो नि !'\n\n'दाहालले जहिले पनि क्रमभंग, धक्का, महाविपत्ती जहिले पनि ल्याउनुहुन्छ । अलिकति सोझियो कि महाविपत्ति ल्याउनुहुन्छ । देशलाई महाविपत्तीमा लग्नुहुन्छ,' भट्टको भनाइ थियो ।\n\nदाहालले प्रधानमन्त्री बन्न खोजेको र माधवकुमार नेपालले दोस्रो वरियताको अध्यक्ष खोज्दा पार्टीमा अहिलेको अवस्था आएको बताए । \n\nप्रधामन्त्री ओलीले ल्याएको 'सुखी नेपाली, समृद्ध नेपाल' नारा नभएर विचारधारा भएको भट्टको भनाइ थियो । \n\nप्रधानमन्त्रीलाई काम गर्न नदिएपछि संसद विघटन गरिएको भट्टको भनाइ थियो । दाहाल र नेपालले प्रधानमन्त्रीको कुर",
		  "link": "https://ekantipur.com/news/2020/12/30/16093229471786339.html",
		  "imageLink": "https://assets-cdn-api.kantipurdaily.com/thumb.php?src=https://assets-cdn-np.kantipurdaily.com/uploads/source/news/kantipur/2020/politics/oli-bhatta-30122020110640-1000x0.jpg&w=1000&h=0",
		  "source": {
			"_id": "ekantipur",
			"name": "कान्तिपुर",
			"url": null,
			"category": null,
			"link": null,
			"logoLink": "https://assets-cdn-api.kantipurdaily.com/thumb.php?src=https://assets-cdn-np.kantipurdaily.com/uploads/source/news/kantipur/2020/politics/ashthalaxmishakyancpleader02-3072020031013-1000x0.jpg&w=1000&h=0"
		  },
		  "category": "headline",
		  "publishedDate": "1609324463806",
		  "createdDate": "1609324463806",
		  "modifiedDate": "1609324463806",
		  "topic": "headline",
		  "tags": [
			"प्रचण्ड"
		  ],
		  "totalWeight": 27,
		  "dislikes": [],
		  "likes": []
		},]
	return (
		<FlatList
			contentContainerStyle={[eva.style.container,{backgroundColor: theme.colors.background}]}
			data={articles}
			renderItem={renderItem}
			keyExtractor={(item) => item._id}
			ref={ref}
			ListHeaderComponent={headerComponent}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#0000ff', '#689F38']} />}
		/>
	)
})

export const ArticleList = withStyles(ArticleListComponent, (theme) => ({
	container: {
		paddingHorizontal: 12,
		paddingVertical: 4,
		backgroundColor: theme['background-basic-color-1'],
	},
	item: {
		marginVertical: 4,
		backgroundColor: theme['background-basic-color-1'],
		borderBottomWidth: 1,
		// borderBottomColor: '#F5F0F0',
	},
}))
