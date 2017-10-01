<?xml version="1.0"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output indent="yes"/>
    <xsl:template match="studentsDataBase">
        <HTML>
            <HEAD>
                <link rel="stylesheet"   
                 href="style.css"  type="text/css"/>
            </HEAD>
            <BODY>
                <!--<xsl:apply-templates/>-->
               
				  <article>
                    <xsl:for-each select="faculty">
					<table>
                        <tr>
						
                            <caption><xsl:value-of select="@FNAME"/></caption>
							
                           </tr> 
						    <xsl:for-each select="course">
						   <tr>
                          <td>Курс</td>
							<td><xsl:value-of select="@COURSE"/></td>
							 
							</tr> 
							<xsl:for-each select="speciality">
							<tr>
							<td>Спеціальність</td>
							<td><xsl:value-of select="@SPEC"/></td>
							 
							</tr> 
							<xsl:for-each select="department">
							<tr>
							<td>Кафедра</td>
                           <td><xsl:value-of select="@DEP"/></td>
						   
						   </tr> 
						   <xsl:for-each select="group">
						   <tr>
							<td>Група</td>
                            <td><xsl:value-of select="@GROUP"/></td>
							 
							</tr> 
							<xsl:for-each select="student">
							<tr>
							<td>Студент</td>
                            <td><xsl:value-of select="@NAME"/></td>
							
							</tr> 
							<tr>
							<td>ID</td>
							<td><xsl:value-of select="@IDCARD"/></td>
							
							</tr> 
							<table>
							<tr>
							<td>Предмет</td>
							<td>Тип контролю</td>
							<td>Оцінка/100</td>
							<td>Оцінка</td>
							 </tr> 
							 
							 
							<xsl:for-each select="subject">
							<tr>
							<td><xsl:value-of select="@SUB"/></td>
							<td><xsl:value-of select="@TESTTYPE"/></td>
							<td><xsl:value-of select="@MARK"/></td>
							<td><xsl:value-of select="@TYPEMARK"/></td>
							 </tr> 
							  </xsl:for-each>
							 </table>
							
							 
							
					
					   </xsl:for-each>
					    </xsl:for-each>
						 </xsl:for-each>
						  </xsl:for-each>
						   </xsl:for-each>
						    </table>
							<br></br>
						    </xsl:for-each>
                      
						
					
               </article>
            </BODY>
        </HTML>
    </xsl:template>


</xsl:stylesheet>