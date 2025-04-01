import { useState } from "react"
import { MessageSquare, HelpCircle, Mail, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import CustomButton from "@/components/CustomButton"

function HelpCenter() {
  const [openSection, setOpenSection] = useState(null)

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section)
  }

  // FAQ questions and answers
  const faqItems = [
    {
      question: "How do I create a gig?",
      answer:
        "To create a gig, navigate to the 'My Creations' page and click on the 'Create Gig' button. Fill in the required details about your gig, including title, description, category, and pricing, then submit the form.",
    },
    {
      question: "How do I create a course?",
      answer:
        "To create a course, go to the 'My Creations' page and click on the 'Create Course' button. You can choose between creating a self-paced course or a 1-on-1 course. Follow the steps to add content, set pricing, and publish your course.",
    },
    {
      question: "How do payments work?",
      answer:
        "Payments are processed securely through our platform. When someone purchases your gig or course, the funds are held in escrow until the service is completed. Once the buyer confirms completion, the funds are released to your account minus our service fee.",
    },
    {
      question: "What are the fees for using Giggerz?",
      answer:
        "Giggerz charges a 10% service fee on all transactions. This fee covers platform maintenance, payment processing, and customer support. The fee is automatically deducted from the payment before it's transferred to your account.",
    },
    {
      question: "How do I withdraw my earnings?",
      answer:
        "You can withdraw your earnings by going to the 'Earnings' section in your dashboard. Connect your bank account or payment method, then request a withdrawal. Processing times vary depending on your location and payment method.",
    },
  ]

  // Contact methods
  const contactMethods = [
    {
      title: "Email Support",
      details:
        "Send us an email at support@giggerz.com for general inquiries. We typically respond within 24 hours on business days.",
    },
    {
      title: "Live Chat",
      details:
        "Our live chat support is available Monday to Friday, 9 AM to 5 PM (GMT). Click on the 'Chat to get help' button above to start a conversation with our support team.",
    },
    {
      title: "Phone Support",
      details:
        "For urgent matters, call our support line at +1-800-GIGGERZ (800-444-4379). Phone support is available during business hours.",
    },
    {
      title: "Submit a Ticket",
      details:
        "For complex issues, you can submit a support ticket through our help desk system. We'll assign a dedicated support agent to resolve your issue.",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Help Center</h2>
        <p className="text-sm text-muted-foreground">Get support or contact us for help.</p>
      </div>

      {/* Chat to get help */}
      <div className="bg-blue-50 rounded-lg p-6 flex items-start gap-4 cursor-pointer hover:bg-blue-100 transition-colors">
        <div className="bg-white rounded-full p-3">
          <MessageSquare className="h-5 w-5 text-gray-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-lg">Chat to get help</h3>
          <p className="text-muted-foreground">Focused on your exact issues</p>
        </div>
        <CustomButton variant="ghost" size="icon" className="text-gray-400">
          <ChevronRight className="h-5 w-5" />
        </CustomButton>
      </div>

      {/* FAQ Accordion */}
      <div className="border rounded-lg overflow-hidden">
        <div
          className="p-6 flex items-start gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection("faq")}
        >
          <div className="bg-gray-100 rounded-full p-3">
            <HelpCircle className="h-5 w-5 text-gray-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-lg">FAQ</h3>
            <p className="text-muted-foreground">Browse and learn about our services</p>
          </div>
          <div className="text-gray-400">
            {openSection === "faq" ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </div>
        </div>

        {openSection === "faq" && (
          <div className="px-6 pb-6">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>

      {/* Contact us Accordion */}
      <div className="border rounded-lg overflow-hidden">
        <div
          className="p-6 flex items-start gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection("contact")}
        >
          <div className="bg-gray-100 rounded-full p-3">
            <Mail className="h-5 w-5 text-gray-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-lg">Contact us</h3>
            <p className="text-muted-foreground">Browse and learn about our services</p>
          </div>
          <div className="text-gray-400">
            {openSection === "contact" ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </div>
        </div>

        {openSection === "contact" && (
          <div className="px-6 pb-6">
            <Accordion type="single" collapsible className="w-full">
              {contactMethods.map((method, index) => (
                <AccordionItem key={index} value={`contact-${index}`}>
                  <AccordionTrigger className="text-left">{method.title}</AccordionTrigger>
                  <AccordionContent>{method.details}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </div>
  )
}

export default HelpCenter