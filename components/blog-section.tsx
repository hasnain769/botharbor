import { Card, CardContent } from '@/components/ui/card'
import { Calendar, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const articles = [
  {
    title: 'The Future of AI Customer Service: Trends to Watch in 2024',
    excerpt: 'Discover how AI is revolutionizing customer service and what businesses need to know to stay competitive.',
    date: 'Dec 15, 2023',
    readTime: '5 min read',
    image: '/ai-customer-service-future.png'
  },
  {
    title: 'How to Reduce Support Costs by 80% with AI Chatbots',
    excerpt: 'Learn proven strategies for implementing AI chatbots that significantly reduce support costs while improving customer satisfaction.',
    date: 'Dec 12, 2023',
    readTime: '7 min read',
    image: '/placeholder-m1bkh.png'
  },
  {
    title: 'Building Conversational AI That Actually Converts',
    excerpt: 'Best practices for creating chatbots that not only engage users but also drive meaningful business results.',
    date: 'Dec 10, 2023',
    readTime: '6 min read',
    image: '/conversational-ai-optimization.png'
  }
]

export default function BlogSection() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest trends in AI, chatbots, and automation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => (
            <Card 
              key={index} 
              className="bg-gray-900 border-gray-800 hover:border-teal-500 transition-all duration-300 transform hover:scale-105 group overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image || "/placeholder.svg"} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                  </div>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-teal-400 transition-colors duration-300">
                  {article.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                
                <Button 
                  variant="ghost" 
                  className="text-teal-400 hover:text-teal-300 p-0 h-auto font-semibold group-hover:translate-x-1 transition-transform duration-300"
                >
                  Read More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            className="border-gray-600 text-white hover:bg-gray-800"
            size="lg"
          >
            View All Articles
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
