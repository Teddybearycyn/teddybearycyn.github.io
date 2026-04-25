import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Clock, Calendar, User, ChevronDown, Check, Share2, Twitter, Linkedin, Facebook, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import SEO from "../components/SEO.tsx";
import { cn } from "../lib/utils.ts";
import { getBlogBySlug, getBlogs } from "../services/blogService.ts";
import { BlogPost } from "../data/blogs.ts";

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      Promise.all([
        getBlogBySlug(slug),
        getBlogs()
      ]).then(([targetPost, allBlogs]) => {
        setPost(targetPost);
        if (targetPost) {
          // Find posts in the same category first, then fallback to others
          const related = allBlogs
            .filter(p => p.id !== targetPost.id)
            .sort((a, b) => {
              // Primary: matching category
              if (a.category === targetPost.category && b.category !== targetPost.category) return -1;
              if (a.category !== targetPost.category && b.category === targetPost.category) return 1;
              
              // Secondary: shared keywords
              const aKeywords = a.keywords?.filter(k => targetPost.keywords?.includes(k)).length || 0;
              const bKeywords = b.keywords?.filter(k => targetPost.keywords?.includes(k)).length || 0;
              return bKeywords - aKeywords;
            })
            .slice(0, 3);
          setRelatedPosts(related);
        }
        setLoading(false);
      });
    }
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const shareUrl = window.location.href;
  const shareTitle = post?.title || "News More Article";

  const handleShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "native":
        if (navigator.share) {
          navigator.share({
            title: shareTitle,
            url: shareUrl
          }).catch(console.error);
          return;
        }
        break;
    }
    if (url) window.open(url, "_blank", "width=600,height=400");
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-white/40">
        <Loader2 size={40} className="animate-spin mb-4" />
        <p className="font-mono text-xs uppercase tracking-widest">Loading expert analysis...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-40 text-center">
        <h1 className="text-4xl font-display font-medium mb-8">Post Not Found</h1>
        <Link to="/blog" className="text-orange-500 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Back to Library
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={post.title} 
        description={post.excerpt} 
        keywords={post.keywords}
        image={post.image}
        type="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "image": [post.image],
          "datePublished": new Date(post.date).toISOString(),
          "dateModified": new Date(post.date).toISOString(),
          "author": [{
            "@type": "Person",
            "name": post.author,
            "url": "https://newsmore.com/#/about"
          }],
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://newsmore.com/#/blog/${post.slug}`
          },
          "publisher": {
            "@type": "Organization",
            "name": "News More",
            "logo": {
              "@type": "ImageObject",
              "url": "https://newsmore.com/logo.png"
            }
          },
          "description": post.excerpt
        }}
      />
      {post.faqs && post.faqs.length > 0 && (
        <SEO 
          title={post.title}
          description={post.excerpt}
          schema={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": post.faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }}
        />
      )}
      
      <div className="max-w-4xl mx-auto px-6 py-20">
        <Link to="/blog" className="inline-flex items-center gap-2 text-white/40 hover:text-orange-500 transition-colors mb-12 font-medium">
          <ArrowLeft size={16} /> Back to Library
        </Link>

        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-orange-600/10 text-orange-500 text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full border border-orange-500/20">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-medium leading-tight mb-8">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/40 border-y border-white/5 py-6">
            <div className="flex items-center gap-2">
              <User size={16} /> <span>By {post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} /> <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} /> <span>12 min read</span>
            </div>
            <button 
              onClick={() => handleShare("native")}
              className="lg:hidden flex items-center gap-2 text-orange-500 font-bold ml-auto hover:scale-105 transition-transform"
            >
              <Share2 size={16} /> Share
            </button>
          </div>
        </header>

        <div className="aspect-[21/9] rounded-[40px] overflow-hidden mb-16 bg-white/5 shadow-2xl border border-white/10">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover" 
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/1200x630/111827/f97316?text=Expert+Insights";
            }}
          />
        </div>

        <article className="prose prose-invert prose-orange max-w-none mb-24 relative">
          {/* Social Share Floating (Desktop) */}
          <div className="hidden lg:flex flex-col gap-4 absolute -left-20 top-0 bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-xl">
             <button 
               onClick={() => handleShare("twitter")}
               className="p-3 text-white/50 hover:text-orange-500 transition-colors cursor-pointer"
               title="Share on Twitter"
             >
               <Twitter size={20} />
             </button>
             <button 
               onClick={() => handleShare("linkedin")}
               className="p-3 text-white/50 hover:text-orange-500 transition-colors cursor-pointer"
               title="Share on LinkedIn"
             >
               <Linkedin size={20} />
             </button>
             <button 
               onClick={() => handleShare("facebook")}
               className="p-3 text-white/50 hover:text-orange-500 transition-colors cursor-pointer"
               title="Share on Facebook"
             >
               <Facebook size={20} />
             </button>
             <button 
               onClick={() => handleShare("native")}
               className="p-3 text-white/50 hover:text-orange-500 transition-colors cursor-pointer lg:hidden"
               title="Share Article"
             >
               <Share2 size={20} />
             </button>
          </div>

          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <h1 className="text-4xl font-display font-medium mb-8 mt-16" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-3xl font-display font-medium mb-6 mt-12 text-orange-500" {...props} />,
              p: ({ node, ...props }) => <p className="text-lg text-white/70 leading-[1.8] mb-8" {...props} />,
              li: ({ node, ...props }) => <li className="text-white/70 mb-2 marker:text-orange-500" {...props} />,
              strong: ({ node, ...props }) => <strong className="text-white font-semibold" {...props} />,
              a: ({ node, href, ...props }) => {
                const isExternal = href?.startsWith("http");
                return (
                  <a 
                    href={href} 
                    className="text-orange-500 hover:underline font-medium" 
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    {...props} 
                  />
                );
              },
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-orange-600 bg-orange-600/5 p-6 my-12 rounded-r-2xl italic text-white/90" {...props} />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Related Posts */}
        <section className="mb-24 pt-24 border-t border-white/5">
          <h2 className="text-3xl font-display font-medium mb-12 flex items-center justify-between">
            Keep Reading<span className="text-orange-500">.</span>
            <Link to="/blog" className="text-sm font-bold text-orange-500 uppercase tracking-widest hover:underline">All Posts</Link>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((rp) => (
              <Link key={rp.id} to={`/blog/${rp.slug}`} className="group block">
                <div className="aspect-video rounded-2xl overflow-hidden mb-4 bg-white/5 border border-white/10">
                  <img 
                    src={rp.image} 
                    alt={rp.title} 
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/1200x630/111827/f97316?text=Related+Insights";
                    }}
                  />
                </div>
                <h4 className="font-medium text-lg group-hover:text-orange-500 transition-colors leading-tight line-clamp-2">{rp.title}</h4>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="bg-white/[0.03] border border-white/5 rounded-[40px] p-8 md:p-16 mb-24">
            <h2 className="text-3xl md:text-5xl font-display font-medium mb-12">Frequently Asked Questions<span className="text-orange-500">.</span></h2>
            <div className="space-y-4">
              {post.faqs.map((faq, i) => (
                <div key={i} className="border-b border-white/5 pb-4 last:border-0">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between text-left py-4 hover:text-orange-500 transition-colors"
                  >
                    <span className="text-lg font-medium">{faq.question}</span>
                    <ChevronDown className={cn("transition-transform duration-300", openFaq === i && "rotate-180")} />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-white/50 leading-relaxed pb-6 pr-8">
                      {faq.answer}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="text-center bg-orange-600 rounded-[40px] p-12 overflow-hidden relative group">
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
          <h3 className="text-2xl md:text-3xl font-bold mb-6">Need expert help scaling your technology?</h3>
          <p className="mb-8 text-white/90">Contact our professional team today for dedicated consultancy.</p>
          <a href="mailto:info.axelionscale@gmail.com" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform">
            Get in touch <Check size={18} />
          </a>
        </div>
      </div>
    </>
  );
}
