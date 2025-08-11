import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  destination: z.string().optional(),
  customDestination: z.string().optional(),
  travelDate: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      destination: "",
      customDestination: "",
      travelDate: "",
      budget: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Prepare email data with proper destination handling
      const destination = data.destination === "other" ? data.customDestination : data.destination;
      const emailData = {
        ...data,
        finalDestination: destination,
        to: "luxevoyage@deepyinc.com",
        subject: `New Travel Inquiry from ${data.firstName} ${data.lastName}`,
      };
      
      // Send email via mailto (opens user's email client)
      const mailtoLink = `mailto:luxevoyage@deepyinc.com?subject=Travel Inquiry from ${encodeURIComponent(data.firstName + ' ' + data.lastName)}&body=${encodeURIComponent(
        `Name: ${data.firstName} ${data.lastName}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone || 'Not provided'}\n` +
        `Destination: ${destination || 'Not specified'}\n` +
        `Travel Date: ${data.travelDate || 'Not specified'}\n` +
        `Budget: ${data.budget || 'Not specified'}\n\n` +
        `Message:\n${data.message || 'No additional message'}`
      )}`;
      
      // Open the user's email client
      window.location.href = mailtoLink;
      
      console.log("Contact form submitted:", emailData);
      
      toast({
        title: "Email Client Opened!",
        description: "Your email client has been opened with the inquiry details. Please send the email to complete your request.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <GlassmorphismCard>
        <h2 className="text-3xl font-serif font-bold text-navy-deep mb-6">
          Start Planning
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="focus-visible:ring-gold-accent" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="focus-visible:ring-gold-accent" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} className="focus-visible:ring-gold-accent" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} className="focus-visible:ring-gold-accent" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Destination */}
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Destination</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="focus-visible:ring-gold-accent">
                        <SelectValue placeholder="Select a destination" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="santorini">Santorini, Greece</SelectItem>
                      <SelectItem value="kyoto">Kyoto, Japan</SelectItem>
                      <SelectItem value="queenstown">Queenstown, New Zealand</SelectItem>
                      <SelectItem value="maldives">Maldives</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Custom Destination Field - Only shown when "Other" is selected */}
            {form.watch("destination") === "other" && (
              <FormField
                control={form.control}
                name="customDestination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please specify your destination</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Enter your desired destination"
                        className="focus-visible:ring-gold-accent" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Travel Date */}
            <FormField
              control={form.control}
              name="travelDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Travel Dates</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="focus-visible:ring-gold-accent" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Budget */}
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Range</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="focus-visible:ring-gold-accent">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
                      <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10000-20000">$10,000 - $20,000</SelectItem>
                      <SelectItem value="20000+">$20,000+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tell us about your dream trip</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Describe your ideal vacation experience..."
                      className="focus-visible:ring-gold-accent resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-luxury hover:bg-gradient-luxury/90 text-navy-deep font-semibold py-4 text-lg"
              >
                {isSubmitting ? "Sending..." : "Send My Request"}
              </Button>
            </motion.div>
          </form>
        </Form>
      </GlassmorphismCard>
    </motion.div>
  );
}
